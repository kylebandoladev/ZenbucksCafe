import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  processPayment,
  voidOrder,
} from "../controllers/orderController.js";
import { authenticateToken, requireCashier } from "../middleware/auth.js";
import {
  validateRequest,
  orderSchema,
  paymentSchema,
} from "../middleware/validation.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// POS operations
router.post("/", requireCashier, validateRequest(orderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post(
  "/:id/payment",
  requireCashier,
  validateRequest(paymentSchema),
  processPayment
);
router.post("/:id/void", requireCashier, voidOrder);

export default router;
