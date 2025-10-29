import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { logger } from "./logging.js";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: (msg) => logger.info(msg), 
  }
);

sequelize.beforeConnect(() => logger.info("Connecting to database..."));
sequelize.afterConnect(() => logger.info("Connected to database"));
sequelize.afterDisconnect(() => logger.warn("Database disconnected"));

(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");
  } catch (err) {
    logger.error("Database connection failed:", err);
  }
})();
