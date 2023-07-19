import { Router } from "express";

const cardTransactionRouter = Router();

import cardtransasctionscontroller from "../controllers/card_transasctions";
import { guard } from "../middleware/auth";
import { cardValidationMiddleware } from "../middleware/validate";
import transactionRef from "../middleware/paystack";

cardTransactionRouter
  .route("/fundwallet")
  .post(guard, cardtransasctionscontroller.chargeCard);
cardTransactionRouter
  .route("/submitpin")
  .post(transactionRef, cardtransasctionscontroller.submitPin);
cardTransactionRouter
  .route("/submitotp")
  .post(transactionRef, cardtransasctionscontroller.submitPin);

export default cardTransactionRouter;
