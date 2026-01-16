// backend/src/routes/project.js
import express from "express";
import { authMiddleware, requirePM, requireTST } from "../middleware/auth.middleware.js";
import { createProject, joinProjectAsTester, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", authMiddleware, requirePM, createProject);
router.post("/update", authMiddleware, requirePM, updateProject);
router.post("/join", authMiddleware, requireTST, joinProjectAsTester);

export default router;
