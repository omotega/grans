import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import config from "../config/config";
import CardTransaction from "../models/card_transaction";
import db from "../models";
import { charge } from "../helpers/paystack";
import { creditAccount, debitAccount } from "../helpers/transactions";
import { errorResponse, handleError, successResponse } from "../utils/response";

const PAYSTACK_URL = "https://api.paystack.co/charge";


export async function chargeCard(req: Request, res: Response) {
  let credit;
  const { accountId, pan, expiry_month, expiry_year, cvv, email, amount } = req.body;
  const t = await db.transaction();
  try {
    const cardCharge = await axios.post(
      PAYSTACK_URL,
      {
        card: {
          number: pan,
          cvv: cvv,
          expiry_year: expiry_year,
          expiry_month: expiry_month,
        },
        amount: amount,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const card_transaction = await CardTransaction.create({
      externalReference: cardCharge.data.data.reference,
      accountId: accountId,
      amount: amount,
      lastResponse: cardCharge.data.data.status,
    });
    if (cardCharge.data.data.status === "success") {
      credit = await creditAccount(
        {
          amount: amount,
          accountId: accountId,
          purpose: "card-funding",
        },
        t
      );
      // @ts-ignore
      if (credit.success !== true) {
        await t.rollback();
        return { success: false, message: "credit failed" };
      }
    }
    await t.commit();
    return successResponse(res,200,'charge successful')
  } catch (error: any) {
    handleError(req,error);
    await t.rollback();
    return errorResponse(res, 500, "Something went wrong");
  }
}

