import { Router } from "express";

const cardTransactionRouter = Router();

import { chargeCard } from "../controllers/card_transasctions";
import { guard } from "../middleware/auth";
import { cardValidationMiddleware } from "../middleware/validate";

cardTransactionRouter
  .route("/fundwallet")
  .post(guard, chargeCard);

export default cardTransactionRouter;
