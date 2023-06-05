import { creditAccount,  debitAccount } from "../helpers/transactions";
import db from "../models";
import axios from "axios";
import { v4 } from 'uuid'
import { errorResponse, handleError, successResponse } from "../utils/response";
import config from "../config/config";
import { Request, Response } from "express";
import Helper from "../utils/helper";
import Transaction from "../models/transaction";

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
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const transfer = async (req:Request,res:Response) => {
  const t = await db.transaction();
  let bank_code;
  try {
    const { id } = req.User;
    const { accountNumber,bankName,amount } = req.body
    const bank = await axios.get(" https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      },
    });
    const bankData = bank.data.data;
    
    const newData = bankData.filter((item: any) => item.name == bankName).filter((data:any) => {
      bank_code = data.code
    })
    // verify the account number using paystack api
    const isAccountValid = await axios.get(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bank_code}`,
      {
        headers: {
          Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    // create a transfer recipient
    const transferRecipient = await axios.post(' https://api.paystack.co/transferrecipient',{
      type: 'nuban',
      name: isAccountValid.data.data.account_name,
      account_number:accountNumber,
      bank_code: bank_code,
      currency: "NGN"
    },{
      headers:{
        Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      }
    })
    const recipientReference = transferRecipient.data.data.recipient_code;
    const reference = v4();
    const initiateTransfer = await axios.post('https://api.paystack.co/transfer', {
      source: "balance", 
      amount: amount,
      reference: reference, 
      recipient: recipientReference, 
      reason: "Holiday Flexing" 
  },{
      headers:{
        Authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
      },
    })
    console.log(initiateTransfer.data,'Transfer RESULT')
     if(initiateTransfer.data.status === true) {
      const transactionResult = await Promise.all([
      debitAccount({
      amount: 50000,
      accountId: 2,
      purpose:'transfer',
      reference:reference,
      metadata:{
        receiver:recipientReference,
        accountName: 'isAccountValid.data.data.account_name',
          bankCode: bank_code ,
          currency: initiateTransfer.data.data.currency,
      }
    },t),
    creditAccount({
      amount:amount,
      accountId:id,
      purpose:"transfer",
      reference: reference,
      metadata:{
        receiver:recipientReference,
          accountName: 'isAccountValid.data.data.account_name',
          currency: initiateTransfer.data.data.currency,
      }
    },t)
    ])
    const failedTransactions = transactionResult.filter((result:any) => {
    !result.success;
  })
  if(failedTransactions.length) {
    await t.rollback()
    return transactionResult;
  }
  await t.commit()
   return successResponse(res,200,'transfer successful')
     } else {
      return errorResponse(res,401,'Transfer unsuccessful,Try again');
     }
  } catch (error) {
    await await t.rollback();
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export async function withdrawl(req:Request,res:Response)  {
  const t = await db.transaction();
  const { accountid,amount } = req.body
  try {
    const debit = await debitAccount({
      amount:amount,
      accountId:accountid,
      purpose:"withdrawl"
    },t)
     // @ts-ignore
    if(!debit.success) {
      await t.rollback();
      return errorResponse(res,400,'withdrawl could not be completed')
    }
    await t.commit();
    return successResponse(res,200,'withdrawl successful');
  } catch (error) {
    await await t.rollback();
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
    
  }
};

