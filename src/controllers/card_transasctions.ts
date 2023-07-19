import { Request, Response } from "express";
import cardtranscationservice from "../services/cardtranscationservice";
import httpStatus from "http-status";


export async function chargeCard(req: Request, res: Response) {
  const { number, expiry_month, expiry_year, cvv, email, amount, accountId } =
    req.body;
  const response = await cardtranscationservice.fundWalletWithCard({
    number,
    expiry_month,
    expiry_year,
    cvv,
    email,
    amount,
    accountId: accountId,
  });
  res.status(httpStatus.OK).json(response);
}

export const submitPin = async (req: Request, res: Response) => {
  const { pin, accountId, reference } = req.body;
  const response = await cardtranscationservice.submitPin({
    pin,
    accountId,
    reference,
  });
  res.status(httpStatus.OK).json(response);
};

export const submitOtp = async (req: Request, res: Response) => {
  const { accountId, otp, reference } = req.body;
  const response = await cardtranscationservice.submitPhone({
    accountId,
    otp,
    reference,
  });
  res.status(httpStatus.OK).json(response);
};
