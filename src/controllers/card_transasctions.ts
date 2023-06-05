import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import config from "../config/config";
import CardTransaction from "../models/card_transaction";
import User from '../models/user'
import db from "../models";
import { creditAccount } from "../helpers/transactions";
import { errorResponse, handleError, successResponse } from "../utils/response";
import Helper from "../utils/helper";

const PAYSTACK_URL = "https://api.paystack.co/charge";

// funding wallet with card transcations
export async function chargeCard(req: Request, res: Response) {
  let credit;
  const t = await db.transaction();
  const {  pan, expiry_month, expiry_year, cvv, email, amount } =
    req.body;
    const { id } = req.User
  try {
    const cardCharge = await axios.post(
      PAYSTACK_URL,
      {
        card: {
          number: pan,
          cvv: cvv,
          expiry_month: expiry_month,
          expiry_year: expiry_year,
        },
        amount: amount,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    if (cardCharge.data.data.status === "success") {
      const user = await User.findOne({where:{id},transaction:t})
      if(!user) return errorResponse(res,404,'could not find any user with this id')
     
       
      credit = await creditAccount(
        {
          amount: amount,
          accountId: user.dataValues.id,
          purpose: "card-funding",
        },
        t
      );
      // @ts-ignore
      if (credit.success !== true) {
        await t.rollback();
        return { success: false, message: "credit failed" };
      }
      const card_transaction = await CardTransaction.create({
        externalReference: cardCharge.data.data.reference,
        accountId: user.dataValues.id,
        amount: amount,
        lastResponse: cardCharge.data.data.status,
      });
      const reference = cardCharge.data.data.reference;
      await t.commit();
      return successResponse(res, 200, "charge successful", reference);
    } else {
      const user = await User.findOne({where:{id},transaction:t})
      if(!user) return errorResponse(res,404,'could not find any user with this id')
      const card_transaction = await CardTransaction.create({
        externalReference: cardCharge.data.data.reference,
        accountId: user?.dataValues.id,
        amount: amount,
        lastResponse: cardCharge.data.data.status,
      });
      const transactionreference = cardCharge.data.data.reference;
      
      const reference = await Helper.generateToken(
        {
          reference: transactionreference,
        },
        config.ACCESS_TOKEN_SECRET
      );
      res.cookie("reference", reference, {
        maxAge: 300000,
        httpOnly: true,
        path: "/",
      });
      await t.commit();
      return successResponse(
        res,
        200,
        "please submit pin",
        transactionreference
      );
    }
  } catch (error: any) {
    handleError(req, error);
    await t.rollback();
    return errorResponse(res, 500, "Something went wrong");
  }
}

export const submitPin = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { pin } = req.body;
    const reference = req.reference;
    const url = `${PAYSTACK_URL}/submit_pin`;
    const transaction = await CardTransaction.findOne({
      where: { externalReference: reference },
    });
    if (!transaction) {
      return { message: "transaction not found" };
    }
    if (transaction.dataValues.lastResponse === "success") {
      return { message: "transaction already complete" };
    }
    const charge = await axios.post(
      url,
      {
        reference: reference,
        pin: pin,
      },
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    if (charge.data.data.status === "success") {
      const credit = await creditAccount(
        {
          amount: charge.data.data.amount,
          accountId: transaction.dataValues.accountId,
          purpose: "card-funding",
          metadata: {
            externalReference: reference,
          },
        },
        t
      );
      // @ts-ignore
      if (credit.success !== true) {
        await t.rollback();
        return { success: false, message: "credit failed" };
      }
      const card_transaction = await CardTransaction.update(
      { lastResponse: charge.data.data.status },
      { where: { externalReference: reference } }
    );
    await t.commit();
    return successResponse(res, 200, "credit successful", reference);
    } else {
      if(charge.data.data.status === 'send_otp') {
         const card_transaction = await CardTransaction.update(
      { lastResponse: charge.data.data.status },
      { where: { externalReference: reference } }
    );
      }
       await t.commit();
    return successResponse(res, 200, "credit please submit otp", reference);
    }
  } catch (error) {
    handleError(req, error);
    await t.rollback();
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const submitOtp = async (req:Request,res:Response) => {
  const t = await db.transaction();
  try {
    const { otp } = req.body;
    const reference = req.reference;
    const url = `${PAYSTACK_URL}/submit_otp`;

    const transaction = await CardTransaction.findOne({
      where: { externalReference:reference },
    });
    if (!transaction) {
      return { message: "transaction not found" };
    }
    if (transaction.dataValues.lastResponse === "success") {
      return { message: "transaction already complete" };
    }
    const charge = await axios.post(
      url,
      {
        reference: reference,
        otp: otp,
      },
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    if (charge.data.data.status === "success") {
      await CardTransaction.update(
        { lastResponse: charge.data.data.status },
        { where: { externalReference: reference} }
      );
      const credit = await creditAccount(
        {
          amount: charge.data.data.amount,
          accountId: transaction.dataValues.accountId,
          purpose: "card-funding",
          metadata: {
            externalReference: reference,
          },
        },
        t
      );
      // @ts-ignore
      if (credit.success !== true) {
        await t.rollback();
        return { success: false, message: "credit failed" };
      }
       await t.commit();
    return successResponse(res, 200, "credit successful", reference);
    }
    
  } catch (error) {
    handleError(req, error);
    await t.rollback();
    return errorResponse(res, 500, "Something went wrong");
  }
}

