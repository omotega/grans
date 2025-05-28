import { Request, Response } from "express";
import transactionservices from "../services/transaction.services";
import httpStatus from "http-status";
import catchAsync from "../utils/catchasync";

const deposit = catchAsync(async (req: Request, res: Response) => {
  const { accountId, amount } = req.body;
  const response = await transactionservices.deposit({
    accountId,
    amount,
  });
  res.status(httpStatus.OK).json(response);
});

const transfer = catchAsync(async (req: Request, res: Response) => {
  const { accountNumber, bankName, amount } = req.body;
  const { id } = req.User;
  const response = await transactionservices.transfer({
    accountNumber,
    bankName,
    amount,
    // @ts-ignore
    id,
  });
  res.status(httpStatus.OK).json(response);
});

const withdrawl = catchAsync(async (req: Request, res: Response) => {
  const { accountId, amount } = req.body;
  const response = await transactionservices.withdrawl({
    accountId,
    amount,
  });
  res.status(httpStatus.OK).json(response);
});

export default {
  deposit,
  transfer,
  withdrawl,
};
