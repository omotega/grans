import { v4 } from "uuid";
import accountrepo from "../database/repo/accountrepo";
import transactionrepo from "../database/repo/transactionrepo";
import {
  ACCOUNT_NOT_FOUND,
  CREDIT_SUCCESSFUL,
  CREDIT_TRANSACTION_ERROR,
  DEBIT_SUCCESSFUL,
  DEBIT_TRANSACTION_ERROR,
  DECREASE_BALANCE_ERROR,
  INCREASE_BALANCE_ERROR,
  INSUFFICIENT_BALANCE,
} from "../utils/constant";

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
  if (!increaseBalance) throw new Error(INCREASE_BALANCE_ERROR);
  const credit = await transactionrepo.createTransaction({
    txnType: "CREDIT",
    purpose: creditData.purpose,
    amount: creditData.amount,
    accountId: creditData.accountId,
    metadata: creditData.metadata,
    reference: reference,
    balanceBefore: Number(account.balance),
    balanceAfter: Number(account.balance) + Number(creditData.amount),
  });
  if (!credit) throw new Error(CREDIT_TRANSACTION_ERROR);
  return { status: true, message: CREDIT_SUCCESSFUL };
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
  if (Number(account.balance) < debitData.amount)
    throw new Error(INSUFFICIENT_BALANCE);
  const decreasedBalanced = await accountrepo.accountBalanceDecrement(
    debitData.amount,
    debitData.accountId
  );
  if (!decreasedBalanced) throw new Error(DECREASE_BALANCE_ERROR);
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
  if (!debit) throw new Error(DEBIT_TRANSACTION_ERROR);
  return { success: true, message: DEBIT_SUCCESSFUL };
}

export default {
  creditAccount,
  debitAccount,
};
