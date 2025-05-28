import { Request, Response } from "express";
import cardtranscationservice from "../services/cardtranscationservice";
import httpStatus from "http-status";
import catchAsync from "../utils/catchasync";

const chargeCard = catchAsync(async (req: Request, res: Response) => {
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
});

const submitPin = catchAsync(async (req: Request, res: Response) => {
  const { pin, reference } = req.body;
  const { id } = req.User;
  const response = await cardtranscationservice.submitPin({
    pin,
    userId: id,
    reference,
  });
  res.status(httpStatus.OK).json(response);
});

const submitOtp = catchAsync(async (req: Request, res: Response) => {
  const { otp, reference } = req.body;
  const { id } = req.User;
  const response = await cardtranscationservice.submitPhone({
    userId: id,
    otp,
    reference,
  });
  res.status(httpStatus.OK).json(response);
});

export default {
  chargeCard,
  submitPin,
  submitOtp,
};
