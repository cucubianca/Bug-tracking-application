// models/ProjectTester.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Project from "./Project.js";

const ProjectTester = sequelize.define("ProjectTester", {});

ProjectTester.belongsTo(User, { foreignKey: "userId" });
ProjectTester.belongsTo(Project, { foreignKey: "projectId" });

export default ProjectTester;
