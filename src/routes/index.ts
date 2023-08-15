// import adminRouter  from './admin'
// import cardTransactionRouter from './cardTransaction'
import { Router } from "express";
import userRouter from "./user";
import transactionRouter from "./transaction";

const route = Router();

route.use("/user", userRouter);
route.use("/transaction", transactionRouter);

export default route;
