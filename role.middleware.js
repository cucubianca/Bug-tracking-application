import ProjectMembership from "../models/ProjectTester.js";

export const checkProjectRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const projectId =
        req.params.id ||
        req.params.projectId ||
        req.body.projectId;

      if (!projectId) {
        return res.status(400).json({ message: "Project ID is required" });
      }

      const membership = await ProjectMembership.findOne({
        where: {
          userId: req.user.id,
          projectId
        }
      });

      if (!membership || membership.role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
      }

      req.membership = membership;
      next();
    } catch (err) {
      return res.status(500).json({ message: "Permission check failed" });
    }
  };
};
