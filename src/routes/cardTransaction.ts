import { Router } from "express";

const cardTransactionRouter = Router();

import { chargeCard,submitPin,submitOtp } from "../controllers/card_transasctions";
import { guard } from "../middleware/auth";
import { cardValidationMiddleware } from "../middleware/validate";
import transactionRef from "../middleware/paystack";

cardTransactionRouter
  .route("/fundwallet")
  .post(guard,chargeCard);
cardTransactionRouter.route('/submitpin').post(transactionRef,submitPin)
cardTransactionRouter.route('/submitotp').post(transactionRef,submitOtp);

export default cardTransactionRouter;
