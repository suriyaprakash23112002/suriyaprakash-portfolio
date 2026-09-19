import express from "express";

import {
  getSettings,
  getAdminSettings,
  updateSetting,
  deleteSetting,
} from "../controllers/settings.controller.js";

import {
  protectAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/all",
  protectAdmin,
  getAdminSettings
);

router.get(
  "/",
  getSettings
);

router.put(
  "/:key",
  protectAdmin,
  updateSetting
);

router.delete(
  "/:key",
  protectAdmin,
  deleteSetting
);

export default router;