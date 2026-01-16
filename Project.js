import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Project = sequelize.define("Project", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  repoUrl: DataTypes.STRING,

  // ⭐ THIS FIELD WAS MISSING
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relationship
Project.belongsTo(User, { as: "owner", foreignKey: "ownerId" });
// Project.hasMany(Bug, { foreignKey: "projectId" }); // To be defined in index or after import


export default Project;
