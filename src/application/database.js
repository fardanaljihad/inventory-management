import dotenv from "dotenv";
import db from "../../models/index.js";
import { logger } from "./logging.js";

dotenv.config();

const { sequelize } = db;

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
