import prisma from "../config/database.js";
import logger from "../config/logger.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      isActive: true,
      ...(category && { categoryId: category }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { sku: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: {
            where: { isActive: true },
          },
          inventoryItems: true,
        },
        skip,
        take: parseInt(limit),
        orderBy: { name: "asc" },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    logger.error("Get products error:", error);
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: {
          where: { isActive: true },
        },
        inventoryItems: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    logger.error("Get product by ID error:", error);
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const {
      sku,
      name,
      description,
      categoryId,
      defaultPrice,
      isActive = true,
    } = req.validated.body;

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        description,
        categoryId,
        defaultPrice,
        isActive,
      },
      include: {
        category: true,
        variants: true,
        inventoryItems: true,
      },
    });

    // Create inventory item
    await prisma.inventoryItem.create({
      data: {
        productId: product.id,
        quantityOnHand: 0,
        reorderLevel: 10,
        unitCost: defaultPrice * 0.6, // 60% cost ratio
      },
    });

    logger.info("Product created", { productId: product.id, sku: product.sku });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: { product },
    });
  } catch (error) {
    logger.error("Create product error:", error);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.validated.body;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        variants: true,
        inventoryItems: true,
      },
    });

    logger.info("Product updated", { productId: product.id, sku: product.sku });

    res.json({
      success: true,
      message: "Product updated successfully",
      data: { product },
    });
  } catch (error) {
    logger.error("Update product error:", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Soft delete by setting isActive to false
    const product = await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    logger.info("Product deleted", { productId: product.id, sku: product.sku });

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    logger.error("Delete product error:", error);
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    res.json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    logger.error("Get categories error:", error);
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.validated.body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
        isActive: true,
      },
    });

    logger.info("Category created", {
      categoryId: category.id,
      name: category.name,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    logger.error("Create category error:", error);
    next(error);
  }
};
