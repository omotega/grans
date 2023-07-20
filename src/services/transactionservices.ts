import transactionhelpers from "../helpers/transactions";
import {
  DEPOSIT_NOT_SUCCESSFUL,
  DEPOSIT_SUCCESSFUL,
  TRANSFER_SUCCESSFUL,
  TRANSFER_UNSUCCESSFUL,
} from "../utils/constant";
import Helper from "../utils/helper";
import paystackService from "./paystack";

async function deposit(payload: { accountId: string; amount: number }) {
  const { accountId, amount } = payload;
  const credit = await transactionhelpers.creditAccount({
    accountId: accountId,
    amount: amount,
    purpose: "DEPOSIT",
  });
  if (!credit.status) throw new Error(DEPOSIT_NOT_SUCCESSFUL);
  return { status: true, message: DEPOSIT_SUCCESSFUL };
}

async function transfer(payload: {
  accountNumber: string;
  bankName: string;
  amount: number;
}) {
  let bank_code;
  const { accountNumber, bankName, amount } = payload;
  const bank = await paystackService.getBank();
  const bankData = bank.data;

  const newData = bankData
    .filter((item: any) => item.name == bankName)
    .filter((data: any) => {
      bank_code = data.code;
    });

  const isAccountValid = await paystackService.accountValidityCheck({
    accountNumber: accountNumber,
    bankCode: bank_code,
  });
  const transferRecipient = await paystackService.createTransferRecipient({
    name: isAccountValid.data.account_name,
    account_number: accountNumber,
    bank_code: bank_code,
  });

  const recipientReference = transferRecipient.data.recipient_code;
  const reference = await Helper.generateReference();

  const initiateTransfer = await paystackService.initiateTransfer({
    source: "balance",
    amount: amount,
    reference: reference,
    recipient: recipientReference,
    reason: "Holiday Flexing",
  });

  if (initiateTransfer.data.status != "success")
    throw new Error(TRANSFER_UNSUCCESSFUL);
  const transferResult = await Promise.all([
    await transactionhelpers.creditAccount({
      amount: 50000,
      accountId: accountNumber,
      purpose: "transfer",
      reference: reference,
      metadata: {
        receiver: recipientReference,
        accountName: "isAccountValid.data.data.account_name",
        bankCode: bank_code,
        currency: initiateTransfer.data.data.currency,
      },
    }),
    await transactionhelpers.debitAccount({
      amount: amount,
      accountId: accountNumber,
      purpose: "transfer",
      reference: reference,
      metadata: {
        receiver: recipientReference,
        accountName: "isAccountValid.data.data.account_name",
        currency: initiateTransfer.data.data.currency,
      },
    }),
  ]);
  const failedTransactions = await transferResult.filter((result: any) => {
    !result.success;
  });
  if (failedTransactions.length) {
    return transferResult;
  }
  return { status: true, message: TRANSFER_SUCCESSFUL };
}


export default {
  deposit,
  transfer,
};
