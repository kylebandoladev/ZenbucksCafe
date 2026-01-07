import prisma from "../config/database.js";
import logger from "../config/logger.js";

export const createOrder = async (req, res, next) => {
  try {
    const { customerId, items } = req.validated.body;
    const cashierId = req.user.id;

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `ORD-${String(orderCount + 1).padStart(6, "0")}`;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { inventoryItems: true },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is not available`,
        });
      }

      // Check inventory
      const inventoryItem = product.inventoryItems[0];
      if (inventoryItem && inventoryItem.quantityOnHand < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient inventory for ${product.name}. Available: ${inventoryItem.quantityOnHand}`,
        });
      }

      const itemTotal = item.unitPrice * item.quantity - (item.discount || 0);
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount || 0,
        tax: 0, // TODO: Calculate tax based on product category
        total: itemTotal,
      });
    }

    const tax = subtotal * 0.08; // 8% tax - TODO: Make configurable
    const total = subtotal + tax;

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          cashierId,
          status: "OPEN",
          subtotal,
          tax,
          total,
        },
      });

      // Create order items
      for (const item of orderItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            ...item,
          },
        });
      }

      return newOrder;
    });

    logger.info("Order created", {
      orderId: order.id,
      orderNumber: order.orderNumber,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: { order },
    });
  } catch (error) {
    logger.error("Create order error:", error);
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, from, to } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(status && { status }),
      ...(from &&
        to && {
          createdAt: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: true,
          cashier: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  sku: true,
                },
              },
            },
          },
          payments: true,
        },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error("Get orders error:", error);
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        cashier: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
              },
            },
            modifiers: true,
          },
        },
        payments: true,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    logger.error("Get order by ID error:", error);
    next(error);
  }
};

export const processPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { method, amount, changeGiven = 0 } = req.validated.body;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: { inventoryItems: true },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status !== "OPEN") {
      return res.status(400).json({
        success: false,
        message: "Order is not open for payment",
      });
    }

    if (amount < order.total) {
      return res.status(400).json({
        success: false,
        message: "Payment amount is less than order total",
      });
    }

    // Process payment and update inventory in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create payment
      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          method,
          amount,
          changeGiven,
        },
      });

      // Update order status
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          status: "PAID",
          closedAt: new Date(),
        },
      });

      // Update inventory for each item
      for (const item of order.items) {
        const inventoryItem = item.product.inventoryItems[0];
        if (inventoryItem) {
          // Create inventory transaction
          await tx.inventoryTransaction.create({
            data: {
              itemId: inventoryItem.id,
              type: "SALE",
              quantity: -item.quantity, // Negative for sale
              unitCost: inventoryItem.unitCost,
              referenceId: order.id,
              createdBy: req.user.id,
            },
          });

          // Update quantity on hand
          await tx.inventoryItem.update({
            where: { id: inventoryItem.id },
            data: {
              quantityOnHand: {
                decrement: item.quantity,
              },
            },
          });
        }
      }

      return { payment, order: updatedOrder };
    });

    logger.info("Payment processed", {
      orderId: order.id,
      paymentId: result.payment.id,
      amount: result.payment.amount,
    });

    res.json({
      success: true,
      message: "Payment processed successfully",
      data: result,
    });
  } catch (error) {
    logger.error("Process payment error:", error);
    next(error);
  }
};

export const voidOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "VOID") {
      return res.status(400).json({
        success: false,
        message: "Order is already voided",
      });
    }

    if (order.payments.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot void paid order",
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: "VOID" },
    });

    logger.info("Order voided", {
      orderId: order.id,
      orderNumber: order.orderNumber,
    });

    res.json({
      success: true,
      message: "Order voided successfully",
      data: { order: updatedOrder },
    });
  } catch (error) {
    logger.error("Void order error:", error);
    next(error);
  }
};
