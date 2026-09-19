import express from "express";

import {
  getProjects,
  getProjectBySlug,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/all",
  protectAdmin,
  getAdminProjects
);

router.get(
  "/",
  getProjects
);

router.get(
  "/:slug",
  getProjectBySlug
);

router.post(
  "/",
  protectAdmin,
  createProject
);

router.put(
  "/:id",
  protectAdmin,
  updateProject
);

router.delete(
  "/:id",
  protectAdmin,
  deleteProject
);

export default router;