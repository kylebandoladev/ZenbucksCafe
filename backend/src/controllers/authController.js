import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/database.js";
import logger from "../config/logger.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validated.body;

    // Find user with roles
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        employee: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is active
    if (user.status !== "ACTIVE") {
      return res.status(401).json({
        success: false,
        message: "Account is inactive",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roles: user.roles.map((ur) => ur.role.name),
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    logger.info("User logged in", { userId: user.id, email: user.email });

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          roles: user.roles.map((ur) => ur.role.name),
          employee: user.employee,
        },
      },
    });
  } catch (error) {
    logger.error("Login error:", error);
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, phone, roleId } = req.validated.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        phone,
        status: "ACTIVE",
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    // Assign role if provided
    if (roleId) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId,
        },
      });
    }

    logger.info("User registered", { userId: user.id, email: user.email });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          roles: user.roles.map((ur) => ur.role.name),
        },
      },
    });
  } catch (error) {
    logger.error("Registration error:", error);
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        employee: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          roles: user.roles.map((ur) => ur.role.name),
          employee: user.employee,
        },
      },
    });
  } catch (error) {
    logger.error("Get profile error:", error);
    next(error);
  }
};
