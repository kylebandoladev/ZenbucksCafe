import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
} from "../controllers/productController.js";
import { authenticateToken, requireManager } from "../middleware/auth.js";
import { validateRequest, productSchema } from "../middleware/validation.js";

const router = express.Router();

// Public routes (for POS)
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);

// Protected routes (for management)
router.use(authenticateToken);

router.post("/", requireManager, validateRequest(productSchema), createProduct);
router.put(
  "/:id",
  requireManager,
  validateRequest(productSchema),
  updateProduct
);
router.delete("/:id", requireManager, deleteProduct);
router.post("/categories", requireManager, createCategory);

export default router;
