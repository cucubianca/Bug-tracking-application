// src/models/BugHistory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Bug from './bug.js';
import User from './User.js';

const BugHistory = sequelize.define('BugHistory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fromStatus: { type: DataTypes.STRING },
  toStatus: { type: DataTypes.STRING },
  note: { type: DataTypes.TEXT },
}, {
  tableName: 'bug_history',
  timestamps: true
});

BugHistory.belongsTo(Bug, { foreignKey: 'bugId' });
BugHistory.belongsTo(User, { foreignKey: 'actorUserId' });

export default BugHistory;
