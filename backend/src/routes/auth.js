import express from "express";
import { login, register, getProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";
import {
  validateRequest,
  loginSchema,
  registerSchema,
} from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.post("/login", validateRequest(loginSchema), login);
router.post("/register", validateRequest(registerSchema), register);

// Protected routes
router.get("/profile", authenticateToken, getProfile);

export default router;
