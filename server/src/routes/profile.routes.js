import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public */
router.get("/", getProfile);

/* Admin only */
router.put("/", protectAdmin, updateProfile);

export default router;