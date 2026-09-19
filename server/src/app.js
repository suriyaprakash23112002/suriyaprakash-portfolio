import express from "express";
import cors from "cors";

import apiRoutes from "./routes/index.js";

const app = express();

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Suriyaprakash Portfolio API is running",
    });
  }
);


/* =========================================================
   API ROUTES
========================================================= */

app.use(
  "/api",
  apiRoutes
);


/* =========================================================
   404
========================================================= */

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        "API route not found.",
    });
  }
);


/* =========================================================
   EXPORT
========================================================= */

export default app;