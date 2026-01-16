// models/Bug.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";
import Project from "./Project.js";

const Bug = sequelize.define("Bug", {
  severity: {
    type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH", "CRITICAL"),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Untitled Bug",
  },
  description: { type: DataTypes.TEXT, allowNull: false },
  commitLink: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "RESOLVED"),
    defaultValue: "OPEN",
  },
  fixCommitLink: DataTypes.STRING,
});

Bug.belongsTo(Project, { foreignKey: "projectId" });
Bug.belongsTo(User, { as: "tester", foreignKey: "testerId" });
Bug.belongsTo(User, { as: "pm", foreignKey: "pmId" });

export default Bug;
