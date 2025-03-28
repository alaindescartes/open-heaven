// 📁 backend/routes/eventRoute.js

import express from "express";
import { registerForEvent } from "../controller/eventController.js";

const router = express.Router();

// GET / (test route)
router.get("/", (req, res) => {
  res.send("hey there");
});

// POST /register – used by frontend modal form
router.post("/register", registerForEvent);

export default router;
