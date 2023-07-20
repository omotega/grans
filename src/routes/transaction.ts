import { Router } from "express";

const transactionRouter = Router();
import transactionController from "../controllers/transactions";
import { guard } from "../middleware/auth";

transactionRouter.route("/deposit").post(transactionController.deposit);
transactionRouter
  .route("/transfer")
  .post(guard, transactionController.transfer);
transactionRouter
  .route("/withdrawl")
  .post(guard, transactionController.withdrawl);

export default transactionRouter;
