import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log("DB USER:", process.env.DB_USER);
console.log("DB PASSWORD:", process.env.DB_PASSWORD ? "SET" : "EMPTY");
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB NAME:", process.env.DB_NAME);
console.log("DB PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    port: process.env.DB_PORT,
  }
);

export default sequelize;

