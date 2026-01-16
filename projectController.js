// controllers/project.js
import Project from "../models/Project.js";
import ProjectTester from "../models/ProjectTester.js";

import User from "../models/User.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, repoUrl, teamEmails } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const project = await Project.create({
      name,
      description,
      repoUrl,
      ownerId: req.user.id,
    });

    // Add team members
    if (teamEmails && Array.isArray(teamEmails) && teamEmails.length > 0) {
      const users = await User.findAll({ where: { email: teamEmails } });
      const memberships = users.map(user => ({
        projectId: project.id,
        userId: user.id
      }));
      if (memberships.length > 0) {
        await ProjectTester.bulkCreate(memberships);
      }
    }

    res.status(201).json(project);
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, description, repoUrl } = req.body;
    if (!name) return res.status(400).json({ message: "Project name required to identify project" });

    const project = await Project.findOne({
      where: { name, ownerId: req.user.id }
    });

    if (!project) return res.status(404).json({ message: "Project not found or you are not the owner" });

    if (description !== undefined) project.description = description;
    if (repoUrl !== undefined) project.repoUrl = repoUrl;

    await project.save();

    res.json({ message: "Project updated", project });
  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: "Failed to update project" });
  }
};

export const joinProjectAsTester = async (req, res) => {
  try {
    const { projectName } = req.body;
    if (!projectName) {
      return res.status(400).json({ message: "projectName required" });
    }

    // Find project by name instead of ID
    const project = await Project.findOne({
      where: { name: projectName }
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create tester membership
    await ProjectTester.create({
      projectId: project.id,
      userId: req.user.id
    });

    res.json({ message: "Joined as tester" });
  } catch (err) {
    console.error("Join project error:", err);
    res.status(500).json({ message: "Failed to join project" });
  }
};
