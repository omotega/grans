import transactionsHelper from "../helpers/transactions";
import { TRANSFER_SUCCESSFUL } from "../utils/constant";
import paystackServices from "./paystack";

async function bankTransfer(payload: {
  email: string;
  amount: string;
  accountNumber: string;
  phone: string;
  token: string;
  bankName: string;
  userId: string;
}) {
  const { email, amount, accountNumber, phone, token, bankName, userId } =
    payload;
  const getbanks = await paystackServices.getBankForBankTransfer();
  const bankDetails = getbanks.data;
  const getBankCode = bankDetails.filter((data: any) => data.name === bankName);
  const bank_code = getBankCode[0].code;
  const accountId = await transactionsHelper.getUserAccountId(userId);
  if (bankName === "Kuda Bank") {
    const transfer = await bankTransferForKuda({
      email: email,
      amount: amount,
      code: bank_code,
      phone: phone,
      token: token,
    });
    const creditAccount = await transactionsHelper.creditAccount({
      amount: Number(amount),
      accountId: accountId,
    });
    if (creditAccount.status) return TRANSFER_SUCCESSFUL;
  } else {
    const transfer = await paystackServices.bankTransfer({
      email: email,
      amount: amount,
      code: bank_code,
      accountNumber: accountNumber,
      token: token,
    });
    const creditAccount = await transactionsHelper.creditAccount({
      amount: Number(amount),
      accountId: accountId,
    });
    if (creditAccount.status) return TRANSFER_SUCCESSFUL;
  }
}

async function bankTransferForKuda(payload: {
  email: string;
  amount: string;
  phone: string;
  token: string;
  code: string;
}) {
  const { email, amount, code, phone, token } = payload;
  const transfer = await paystackServices.bankTransfer({
    email: email,
    amount: amount,
    code: code,
    phone: phone,
    token: token,
  });
  return transfer;
}

// bankTransfer({
//   //   email: "customer@email.com",
//   //   amount: "100000",
//   //   code: "50211",
//   //   phone: "+2348100000000",
//   //   token: "123456",
//   bankName: "Kuda Bank",
// })
//   .then(console.log)
//   .catch(console.log);

export default {
  bankTransfer,
};
