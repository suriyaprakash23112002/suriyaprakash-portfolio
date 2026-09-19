import express from "express";

import {
  getEducation,
  getAdminEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/all",
  protectAdmin,
  getAdminEducation
);

router.get(
  "/",
  getEducation
);

router.post(
  "/",
  protectAdmin,
  createEducation
);

router.put(
  "/:id",
  protectAdmin,
  updateEducation
);

router.delete(
  "/:id",
  protectAdmin,
  deleteEducation
);

export default router;