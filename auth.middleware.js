// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const requirePM = (req, res, next) => {
  if (req.user.role !== "PM") {
    return res.status(403).json({ message: "PM access only" });
  }
  next();
};

export const requireTST = (req, res, next) => {
  if (req.user.role !== "TST") {
    return res.status(403).json({ message: "TST access only" });
  }
  next();
};
