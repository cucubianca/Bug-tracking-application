// controllers/bug.js
import Bug from "../models/bug.js";
import Project from "../models/Project.js";
import ProjectTester from "../models/ProjectTester.js";

export const createBug = async (req, res) => {
  try {
    const { projectName, title, severity, description, commitLink } = req.body;

    // Validate required fields
    if (!projectName || !title || !severity || !description || !commitLink) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Find project by NAME
    const project = await Project.findOne({
      where: { name: projectName }
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if tester belongs to this project
    const tester = await ProjectTester.findOne({
      where: { projectId: project.id, userId: req.user.id }
    });

    if (!tester) {
      return res.status(403).json({ message: "Not tester on this project" });
    }

    // Create bug
    const bug = await Bug.create({
      projectId: project.id,
      title,
      severity,
      description,
      commitLink,
      testerId: req.user.id
    });

    res.status(201).json(bug);
  } catch (err) {
    console.error("Create bug error:", err);
    res.status(500).json({ message: "Failed to create bug" });
  }
};

import User from "../models/User.js";
import { Op } from "sequelize";

// ... (createBug remains same)

export const getBugsForPM = async (req, res) => {
  try {
    // 1. Find all projects owned by this PM
    const projects = await Project.findAll({
      where: { ownerId: req.user.id },
      attributes: ['id']
    });

    const projectIds = projects.map(p => p.id);

    if (projectIds.length === 0) {
      return res.json([]);
    }

    // 2. Find all bugs for these projects, excluding RESOLVED
    const bugs = await Bug.findAll({
      where: {
        projectId: projectIds,
        status: { [Op.ne]: 'RESOLVED' }
      },
      include: [{ model: Project }],
    });

    res.json(bugs);
  } catch (err) {
    console.error("Get bugs error:", err);
    res.status(500).json({ message: "Failed to fetch bugs" });
  }
};

export const assignBug = async (req, res) => {
  try {
    const { bugTitle, assigneeName } = req.body;
    if (!bugTitle || !assigneeName) return res.status(400).json({ message: "bugTitle and assigneeName required" });

    const bug = await Bug.findOne({ where: { title: bugTitle } });
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    // Find User by Full Name
    const assignee = await User.findOne({ where: { fullName: assigneeName } });
    if (!assignee) return res.status(404).json({ message: "User not found" });

    bug.pmId = assignee.id; // Assigning to pmId field (acting as assignee)
    bug.status = "IN_PROGRESS";
    await bug.save();

    res.json({ message: "Bug assigned", bug });
  } catch (err) {
    console.error("Assign bug error:", err);
    res.status(500).json({ message: "Failed to assign bug" });
  }
};

export const updateBugStatus = async (req, res) => {
  try {
    const { bugTitle, status, fixCommitLink } = req.body;
    if (!bugTitle || !status) {
      return res.status(400).json({ message: "bugTitle and status required" });
    }

    const bug = await Bug.findOne({ where: { title: bugTitle } });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    if (bug.pmId !== req.user.id) {
      return res.status(403).json({ message: "Not assigned to you" });
    }

    bug.status = status;
    if (fixCommitLink) bug.fixCommitLink = fixCommitLink;
    await bug.save();

    res.json({ message: "Bug updated", bug });
  } catch (err) {
    console.error("Update bug error:", err);
    res.status(500).json({ message: "Failed to update bug" });
  }
};
