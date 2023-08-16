import paystackServices from "../paystack";

async function bankTransfer(payload: {
  email: string;
  amount: string;
  accountNumber: string;
  phone: string;
  token: string;
  bankName: string;
}) {
  const { email, amount, accountNumber, phone, token, bankName } = payload;
  const getbanks = await paystackServices.getBankForBankTransfer();
  const bankDetails = getbanks.data;
  const getBankCode = bankDetails.filter((data: any) => data.name === bankName);
  const bank_code = getBankCode[0].code;
  console.log(bank_code, "THIS IS THE BANK DETAILS OO");
  if (bankName === "Kuda Bank") {
    const transfer = await bankTransferForKuda({
      email: email,
      amount: amount,
      code: bank_code,
      phone: phone,
      token: token,
    });
    console.log(transfer, "THIS IS THE TRANSFER RESULT FROM THE BANKTRANSFER");
  } else {
    const transfer = await paystackServices.bankTransfer({
      email: email,
      amount: amount,
      code: bank_code,
      accountNumber: accountNumber,
      token: token,
    });
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


export default bankTransfer;