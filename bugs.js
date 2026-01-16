// routes/bug.js
import express from "express";
import { authMiddleware, requirePM, requireTST } from "../middleware/auth.middleware.js";
import {
  createBug,
  getBugsForPM,
  assignBug,
  updateBugStatus,
} from "../controllers/bugController.js";

const router = express.Router();

router.post("/create", authMiddleware, requireTST, createBug);
router.get("/pm", authMiddleware, requirePM, getBugsForPM);
router.post("/assign", authMiddleware, requirePM, assignBug);
router.post("/update", authMiddleware, requirePM, updateBugStatus);

export default router;
