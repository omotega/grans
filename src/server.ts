import app from "./app";
import dotenv from "dotenv";
dotenv.config();

import logger from "./logger/logger";

const port = process.env.PORT || 6666;

const server = app.listen(port, async () => {
  logger.info(`server connected on port ${port}`);
});

process.on("unhandledRejection", (error: any) => {
  logger.info(`unhandledRejection: ${error.message}`);
  process.exit(1);
});

export default server;
