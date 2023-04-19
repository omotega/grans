import { v4 } from "uuid";
import Account from "../models/account";
import Transaction from "../models/transaction";
import db from '../models/index';

export async function creditAccount(
  creditData: {
    amount?: number;
    accountId?: number;
    purpose?: string;
    reference?:string
    metadata?: any;
  },
  t: any
) {
  const reference = v4();
  const account = await Account.findOne({
    where: { id: creditData.accountId },
    transaction: t,
  });
  if (!account) return "account not found";
  await account.increment(["balance"], { by: creditData.amount });
  await Transaction.create(
    {
      txnType: "credit",
      purpose: "card-funding",
      amount: creditData.amount,
      accountId: creditData.accountId,
      metadata: creditData.metadata,
      reference: reference,
      balanceBefore: Number(account.balance),
      balanceAfter: Number(account.balance) + Number(creditData.amount),
    },
    { transaction: t, Lock: t.LOCK.UPDATE }
  );
  return { success: true, message: "credit successful" };
}

// Account.increment({balance: -8000},{where:{id:1}}).then(console.log).catch(console.log)

// creditAccount({ amount: 1000, accountId: 1, purpose: "card-funding" })
//    .then(console.log)
//    .catch(console.log);

export async function debitAccount(
  debitData: {
    accountId: number;
    amount: number;
    purpose?: string;
    reference?: string;
    metadata?: any;
  },
  t: any
) {
  const account = await Account.findOne({
    where: { id: debitData.accountId },
    transaction: t,
  });
  if (!account) return "account not found";
  if (Number(account.balance) < debitData.amount) {
    return { error: "insufficient balance" };
  }
  account.increment(["balance"], { by: -debitData.amount });

  const debit = await Transaction.create(
    {
      txnType: "debit",
      purpose: debitData.purpose,
      accountId: debitData.accountId,
      reference: v4(),
      metadata: debitData.metadata,
      balanceBefore: Number(account.balance),
      balanceAfter: Number(account.balance) - Number(debitData.amount),
    },
    {
      transaction: t,
      lock: t.LOCK.UPDATE,
    }
  );
  return { success: true, message: "debit successful" };
}
