import { Request, Response } from "express";
import cardtranscationservice from "../../services/fundwallet/cardtranscationservice";
import httpStatus from "http-status";

async function chargeCard(req: Request, res: Response) {
  const { id } = req.User;
  const { number, expiry_month, expiry_year, cvv, email, amount } = req.body;
  const response = await cardtranscationservice.fundWalletWithCard({
    number,
    expiry_month,
    expiry_year,
    cvv,
    email,
    amount,
    userId: id,
  });
  res.status(httpStatus.OK).json(response);
}

const submitPin = async (req: Request, res: Response) => {
  const { pin, reference } = req.body;
  const { id } = req.User;
  const response = await cardtranscationservice.submitPin({
    pin,
    userId: id,
    reference,
  });
  res.status(httpStatus.OK).json(response);
};

const submitOtp = async (req: Request, res: Response) => {
  const { otp, reference } = req.body;
  const { id } = req.User;
  const response = await cardtranscationservice.submitPhone({
    userId: id,
    otp,
    reference,
  });
  res.status(httpStatus.OK).json(response);
};

export default {
  chargeCard,
  submitPin,
  submitOtp,
};
