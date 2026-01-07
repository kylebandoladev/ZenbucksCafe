import { z } from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.validated = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
      }

      next(error);
    }
  };
};

// Common validation schemas
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    phone: z.string().optional(),
    roleId: z.string().optional(),
  }),
});

export const productSchema = z.object({
  body: z.object({
    sku: z.string().min(1, "SKU is required"),
    name: z.string().min(1, "Product name is required"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Category ID is required"),
    defaultPrice: z.number().positive("Price must be positive"),
    isActive: z.boolean().optional(),
  }),
});

export const orderSchema = z.object({
  body: z.object({
    customerId: z.string().optional(),
    items: z
      .array(
        z.object({
          productId: z.string().min(1, "Product ID is required"),
          quantity: z.number().int().positive("Quantity must be positive"),
          unitPrice: z.number().positive("Unit price must be positive"),
          discount: z.number().min(0).optional(),
        })
      )
      .min(1, "At least one item is required"),
  }),
});

export const paymentSchema = z.object({
  body: z.object({
    method: z.enum(["CASH", "CARD", "MOBILE"]),
    amount: z.number().positive("Amount must be positive"),
    changeGiven: z.number().min(0).optional(),
  }),
});
