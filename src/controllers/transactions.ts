import { Request, Response } from "express";
import transactionservices from "../services/transactionservices";
import httpStatus from "http-status";

export const deposit = async (req: Request, res: Response) => {
  const { accountId, amount } = req.body;
  const response = await transactionservices.deposit({
    accountId,
    amount,
  });
  res.status(httpStatus.OK).json(response);
};

export const transfer = async (req: Request, res: Response) => {
  const { accountNumber, bankName, amount } = req.body;
  const response = await transactionservices.transfer({
    accountNumber,
    bankName,
    amount,
  });
  res.status(httpStatus.OK).json(response);
};

export async function withdrawl(req: Request, res: Response) {
  const t = await db.transaction();
  const { accountid, amount } = req.body;
  try {
    const debit = await debitAccount(
      {
        amount: amount,
        accountId: accountid,
        purpose: "withdrawl",
      },
      t
    );
    // @ts-ignore
    if (!debit.success) {
      await t.rollback();
      return errorResponse(res, 400, "withdrawl could not be completed");
    }
    await t.commit();
    return successResponse(res, 200, "withdrawl successful");
  } catch (error) {
    await await t.rollback();
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
}
