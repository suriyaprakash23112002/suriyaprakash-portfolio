import express from "express";

import {
  getCareerJourney,
  getAdminCareerJourney,
  createCareerJourney,
  updateCareerJourney,
  deleteCareerJourney,
} from "../controllers/career.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/all",
  protectAdmin,
  getAdminCareerJourney
);

router.get(
  "/",
  getCareerJourney
);

router.post(
  "/",
  protectAdmin,
  createCareerJourney
);

router.put(
  "/:id",
  protectAdmin,
  updateCareerJourney
);

router.delete(
  "/:id",
  protectAdmin,
  deleteCareerJourney
);

export default router;