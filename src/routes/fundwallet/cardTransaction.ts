import { Router } from "express";

const cardTransactionRouter = Router();

import cardtransasctionscontroller from "../../controllers/fundwallet/card_transasctions";
import authMiddleware from "../../middleware/auth";

cardTransactionRouter
  .route("/fundwallet")
  .post(authMiddleware.guard, cardtransasctionscontroller.chargeCard);
cardTransactionRouter
  .route("/submitpin")
  .post(authMiddleware.guard, cardtransasctionscontroller.submitPin);
cardTransactionRouter
  .route("/submitotp")
  .post(authMiddleware.guard, cardtransasctionscontroller.submitPin);

export default cardTransactionRouter;
