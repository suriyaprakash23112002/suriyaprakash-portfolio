import express from "express";

import {
  getExperiences,
  getAdminExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/all",
  protectAdmin,
  getAdminExperiences
);

router.get(
  "/",
  getExperiences
);

router.post(
  "/",
  protectAdmin,
  createExperience
);

router.put(
  "/:id",
  protectAdmin,
  updateExperience
);

router.delete(
  "/:id",
  protectAdmin,
  deleteExperience
);

export default router;