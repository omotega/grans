import "express-async-errors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import httpLogger from "./logger/httplogger";
import { CustomRequest } from "./types/customrequest";
import route from "./routes/index";

dotenv.config();

const app = express();

app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to this wallet application");
});

app.use("/api", route);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    status: "error",
    error: "Not found",
    message: "Route not correct,kindly check url",
  });
});

export default app;
