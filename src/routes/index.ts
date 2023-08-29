import { Router } from "express";
import userRouter from "./user";
import transactionRouter from "./transaction";
import cardTransactionRouter from "./fundwallet/cardTransaction";
import bankTransferRouter from "./fundwallet/banktransfer";

const route = Router();

route.use("/user", userRouter);
route.use("/transaction", transactionRouter);
route.use("/cardtransaction", cardTransactionRouter);
route.use("/funwallet", bankTransferRouter);

export default route;
