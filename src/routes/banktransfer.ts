import { Router } from "express";

const bankTransferRouter = Router();

import bankTransfercontroller from "../controllers/banktransfer";
import authMiddleware from "../middleware/auth";

bankTransferRouter.post(
  "/banktransfer",
  authMiddleware.guard,
  bankTransfercontroller.bankTransfer
);

export default bankTransferRouter;
