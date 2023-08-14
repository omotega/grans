import fetch from "node-fetch";
import config from "../config/config";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

async function sendRequest(payload: {
  url: string;
  method: string;
  body?: object;
}) {
  const { url, method, body } = payload;
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
}

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
  const response = await sendRequest({ url: url, method: "post", body: input });
  return response;
};

const submitPin = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_pin`;
  const input = {
    reference: payload.reference,
    pin: payload.pin,
  };

  const response = await sendRequest({ url: url, method: "post", body: input });
  return response;
};

const submitPhone = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_otp`;
  const input = {
    reference: payload.reference,
    otp: payload.otp,
  };

  const response = await sendRequest({ url: url, method: "post", body: input });
  return response;
};

const getBank = async () => {
  const url = `${PAYSTACK_BASE_URL}/bank`;
  const response = await sendRequest({ url: url, method: "get" });
  return response;
};

const accountValidityCheck = async (payload: any) => {
  const input = {
    accountNumber: payload.accountNumber,
    bankCode: payload.bankCode,
  };
  const url = `${PAYSTACK_BASE_URL}/bank/resolve?account_number=${input.accountNumber}&bank_code=${input.bankCode}`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
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
  const response = await sendRequest({ url: url, method: "post", body: input });
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

  const response = await sendRequest({ url: url, method: "post", body: input });
  return response;
};

const getBankForBankTransfer = async () => {
  const url = `${PAYSTACK_BASE_URL}/bank?pay_with_bank=true`;
  const response = await sendRequest({ url: url, method: "get" });
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

  const response = await sendRequest({ url: url, method: "post", body: input });
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
