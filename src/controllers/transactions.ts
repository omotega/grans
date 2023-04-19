import { creditAccount,  debitAccount } from "../helpers/transactions";
import db from "../models";
import axios from "axios";
import { v4 } from 'uuid'
import { errorResponse, successResponse } from "../utils/response";
import config from "../config/config";
import { Request, Response } from "express";

export const deposit = async (req:Request,res:Response) => {
  const t = await db.transaction();
  try {
    const { accountId,amount } = req.body;
    const credit = await creditAccount(
      {
        accountId: accountId,
        amount: amount,
        purpose: "deposit",
      },
      t
    );
    // @ts-ignore
    if (!credit.success) {
      return { success: false, message: "deposit not successful" };
    }
    await t.commit();
    return successResponse(res,200,'deposit successful')
  } catch (error) {
    await t.rollback();
    return errorResponse(res, 500, "Something went wrong");
  }
};


