import { v4 } from "uuid";
import accountrepo from "../database/repo/accountrepo";
import transactionrepo from "../database/repo/transactionrepo";
import { ACCOUNT_NOT_FOUND } from "../utils/constant";

async function creditAccount(creditData: {
  amount: number;
  accountId: string;
  purpose?: string;
  reference?: string;
  metadata?: any;
}) {
  const reference = v4();
  const account = await accountrepo.findAccountById(creditData.accountId);
  if (!account) throw new Error(ACCOUNT_NOT_FOUND);
  const increaseBalance = await accountrepo.accountBalanceIncrement(
    creditData.amount,
    creditData.accountId
  );
  const transaction = await transactionrepo.createTransaction({
    txnType: "CREDIT",
    purpose: creditData.purpose,
    amount: creditData.amount,
    accountId: creditData.accountId,
    metadata: creditData.metadata,
    reference: reference,
    balanceBefore: Number(account.balance),
    balanceAfter: Number(account.balance) + Number(creditData.amount),
  });
  return { status: true, message: "Credit succesful" };
}

async function debitAccount(debitData: {
  accountId: string;
  amount: number;
  purpose?: string;
  reference?: string;
  metadata?: any;
}) {
  const account = await accountrepo.findAccountById(debitData.accountId);
  if (!account) throw new Error(ACCOUNT_NOT_FOUND);
  if (Number(account.balance) < debitData.amount) {
    return { error: "insufficient balance" };
  }
  const decreasedBalanced = await accountrepo.accountBalanceDecrement(
    debitData.amount,
    debitData.accountId
  );
  const debit = await transactionrepo.createTransaction({
    amount: debitData.amount,
    txnType: "DEBIT",
    purpose: debitData.purpose,
    accountId: debitData.accountId,
    reference: v4(),
    metadata: debitData.metadata,
    balanceBefore: Number(account.balance),
    balanceAfter: Number(account.balance) - Number(debitData.amount),
  });
  return { success: true, message: "debit successful" };
}

export default {
  creditAccount,
  debitAccount
}