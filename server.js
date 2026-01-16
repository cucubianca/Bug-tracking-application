// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import bugRoutes from "./routes/bugs.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bugs", bugRoutes);

import { syncModels } from "./models/index.js";
// ... (imports)

// ...

syncModels().then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
