import dotenv from "dotenv";
import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  logger.info(`🚀 App started on port ${PORT}`);
});
