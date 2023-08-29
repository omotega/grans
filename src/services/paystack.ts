import config from "../config/config";
import transactionshelper from "../helpers/transactions";

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const paystackSecretKey = config.PAYSTACK_SECRET_KEY;

const chargeCard = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge`;
  const input = {
    card: {
      number: payload.number,
      cvv: payload.cvv,
      expiry_month: payload.expiry_month,
      expiry_year: payload.expiry_year,
    },
    amount: payload.amount,
    email: payload.email,
  };
  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};

const submitPin = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_pin`;
  const input = {
    reference: payload.reference,
    pin: payload.pin,
  };

  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};

const submitPhone = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_otp`;
  const input = {
    reference: payload.reference,
    otp: payload.otp,
  };

  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};

const getBank = async () => {
  const url = `${PAYSTACK_BASE_URL}/bank`;
  const response = await transactionshelper.sendRequest({
    url: url,
    method: "get",
    secret: paystackSecretKey,
  });
  return response;
};

const accountValidityCheck = async (payload: any) => {
  const input = {
    accountNumber: payload.accountNumber,
    bankCode: payload.bankCode,
  };
  const url = `${PAYSTACK_BASE_URL}/bank/resolve?account_number=${input.accountNumber}&bank_code=${input.bankCode}`;
  const response = await transactionshelper.sendRequest({
    url: url,
    method: "get",
    secret: paystackSecretKey,
  });
  return response;
};

const createTransferRecipient = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/transferrecipient`;
  const input = {
    type: "nuban",
    name: payload.name,
    account_number: payload.account_number,
    bank_code: payload.bank_code,
    currency: "NGN",
  };
  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};

const initiateTransfer = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/transfer`;
  const input = {
    source: "balance",
    amount: payload.amount,
    reference: payload.reference,
    recipient: payload.recipient,
    reason: payload.reason,
  };

  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};

const getBankForBankTransfer = async () => {
  const url = `${PAYSTACK_BASE_URL}/bank?pay_with_bank=true`;
  const response = await transactionshelper.sendRequest({
    url: url,
    method: "get",
    secret: paystackSecretKey,
  });
  return response;
};

const bankTransfer = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge`;
  const input = {
    email: payload.email,
    amount: payload.amount,
    bank: {
      code: payload.code,
      account_number: payload.account_number,
      phone: payload.phone,
      token: payload.token,
    },
  };

  const response = await transactionshelper.sendRequest({
    url: url,
    method: "post",
    body: input,
    secret: paystackSecretKey,
  });
  return response;
};



export default {
  chargeCard,
  submitPin,
  submitPhone,
  getBank,
  accountValidityCheck,
  createTransferRecipient,
  initiateTransfer,
  getBankForBankTransfer,
  bankTransfer,
};
