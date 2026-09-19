import express from "express";

import {
  getSkillCategories,
  getAdminSkillCategories,
  createSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
} from "../controllers/skillCategories.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  getSkillCategories
);

router.get(
  "/admin/all",
  protectAdmin,
  getAdminSkillCategories
);

router.post(
  "/",
  protectAdmin,
  createSkillCategory
);

router.put(
  "/:id",
  protectAdmin,
  updateSkillCategory
);

router.delete(
  "/:id",
  protectAdmin,
  deleteSkillCategory
);

export default router;