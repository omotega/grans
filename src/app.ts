import "express-async-errors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import ErrorHandler from "./middleware/errormiddleware";
import { CustomRequest } from "./utils/interface";
import userRouter from "./routes/user";

dotenv.config();
const port = process.env.PORT;

const app = express();

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

app.use(ErrorHandler);

app.use("/api", userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    status: "error",
    error: "Not found",
    message: "Route not correct,kindly check url",
  });
});

export default app;
