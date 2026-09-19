import express from "express";

import {
  login,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  login
);

router.get(
  "/me",
  protectAdmin,
  getCurrentAdmin
);

export default router;