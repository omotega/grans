import httpStatus from "http-status";
import bankTransferServices from "../../services/fundwallet/banktransfer";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchasync";

const bankTransfer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.User;
  const { email, amount, accountNumber, phone, token, bankName } = req.body;
  const response = await bankTransferServices.bankTransfer({
    email: email,
    accountNumber: accountNumber,
    amount: amount,
    phone: phone,
    token: token,
    bankName: bankName,
    userId: id,
  });
  res.status(httpStatus.OK).json(response);
});

export default {
  bankTransfer,
};
