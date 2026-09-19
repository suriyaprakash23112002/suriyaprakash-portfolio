import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../utils/prisma.js";

/* =========================================================
   ADMIN LOGIN
========================================================= */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "This admin account is inactive.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing."
      );
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },

      data: {
        lastLoginAt: new Date(),
      },
    });

    return res.status(200).json({
      success: true,

      message:
        "Login successful.",

      token,

      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while logging in.",
    });
  }
};


/* =========================================================
   GET CURRENT ADMIN
========================================================= */

export const getCurrentAdmin =
  async (req, res) => {
    try {
      const admin =
        await prisma.adminUser.findUnique({
          where: {
            id: req.admin.id,
          },

          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            lastLoginAt: true,
            createdAt: true,
          },
        });

      if (!admin) {
        return res.status(404).json({
          success: false,
          message:
            "Admin account not found.",
        });
      }

      return res.status(200).json({
        success: true,
        admin,
      });
    } catch (error) {
      console.error(
        "Get admin error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to retrieve admin account.",
      });
    }
  };