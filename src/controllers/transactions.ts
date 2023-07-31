import { Request, Response } from "express";
import transactionservices from "../services/transactionservices";
import httpStatus from "http-status";

const deposit = async (req: Request, res: Response) => {
  const { accountId, amount } = req.body;
  const response = await transactionservices.deposit({
    accountId,
    amount,
  });
  res.status(httpStatus.OK).json(response);
};

const transfer = async (req: Request, res: Response) => {
  const { accountNumber, bankName, amount } = req.body;
  const response = await transactionservices.transfer({
    accountNumber,
    bankName,
    amount,
  });
  res.status(httpStatus.OK).json(response);
};

async function withdrawl(req: Request, res: Response) {
  const { accountId, amount } = req.body;
  const response = await transactionservices.withdrawl({
    accountId,
    amount,
  });
  res.status(httpStatus.OK).json(response);
}

export default {
  deposit,
  transfer,
  withdrawl,
};
