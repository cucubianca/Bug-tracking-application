// src/models/index.js
import sequelize from '../config/database.js';

import User from './User.js';
import Project from './Project.js';
import Bug from './bug.js'; // FIXED CASE
import ProjectMembership from './ProjectTester.js';
import BugHistory from './BugHistory.js';

// If you want to sync from server.js, export this:
const syncModels = async () => {
  // Define extra associations here to avoid circular deps
  Project.hasMany(Bug, { foreignKey: 'projectId' });

  await sequelize.sync({ alter: true });
};

export default sequelize;
export { User, Project, Bug, ProjectMembership, BugHistory, syncModels };
