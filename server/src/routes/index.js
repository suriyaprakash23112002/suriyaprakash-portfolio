import express from "express";

import authRoutes from "./auth.routes.js";
import profileRoutes from "./profile.routes.js";
import skillsRoutes from "./skills.routes.js";

import skillCategoriesRoutes from "./skillCategories.routes.js";
import projectsRoutes from "./projects.routes.js";
import experienceRoutes from "./experience.routes.js";
import careerRoutes from "./career.routes.js";
import educationRoutes from "./education.routes.js";
import settingsRoutes from "./settings.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import portfolioRoutes from "./portfolio.routes.js";

const router =
  express.Router();

/* Authentication */

router.use(
  "/auth",
  authRoutes
);

/* Portfolio Content */

router.use(
  "/profile",
  profileRoutes
);

router.use(
  "/skills",
  skillsRoutes
);

router.use(
  "/skill-categories",
  skillCategoriesRoutes
);

router.use(
  "/projects",
  projectsRoutes
);

router.use(
  "/experience",
  experienceRoutes
);

router.use(
  "/career",
  careerRoutes
);

router.use(
  "/education",
  educationRoutes
);

router.use(
  "/settings",
  settingsRoutes
);

/* Full Public Portfolio */

router.use(
  "/portfolio",
  portfolioRoutes
);

/* Admin Dashboard */

router.use(
  "/dashboard",
  dashboardRoutes
);

export default router;