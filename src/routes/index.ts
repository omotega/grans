import {  Router, Request, Response, NextFunction  } from "express";
import userRouter from "./user";
import transactionRouter from "./transaction";
import cardTransactionRouter from "./fundwallet/cardTransaction";
import bankTransferRouter from "./fundwallet/banktransfer";
import { errorHandler } from "../middleware/errors/errorhandler";

const route = Router();

route.use("/user", userRouter);
route.use("/transaction", transactionRouter);
route.use("/cardtransaction", cardTransactionRouter);
route.use("/fundwallet", bankTransferRouter);

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error encountered:", err.message || err);
  
    next(err);
  });
  
  route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
  });

export default route;
