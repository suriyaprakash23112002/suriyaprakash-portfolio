import express from "express";

import {
  getSkills,
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/* Admin */
router.get("/admin/all", protectAdmin, getAdminSkills);

/* Public */
router.get("/", getSkills);

/* Admin */
router.post(
  "/",
  protectAdmin,
  createSkill
);

router.put(
  "/:id",
  protectAdmin,
  updateSkill
);

router.delete(
  "/:id",
  protectAdmin,
  deleteSkill
);

export default router;