import app from "./app";
import dotenv from "dotenv";
import http from "http";
import { createHttpTerminator } from "http-terminator";
dotenv.config();

import logger from "./logger/logger";

const port = process.env.PORT || 6666;

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

server.listen(port, async () => {
  logger.info(`server connected on port ${port}`);
});

process.on("unhandledRejection", (error: any) => {
  logger.info(`unhandledRejection: ${error.message}`);
  process.exit(1);
});

export default server;
