import fetch from "node-fetch";
import config from "../config/config";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

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
  const response = await fetch(PAYSTACK_BASE_URL, {
    method: "post",
    body: JSON.stringify(input),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

const submitPin = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_pin`;
  const input = {
    reference: payload.reference,
    pin: payload.pin,
  };
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(input),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

const submitPhone = async (payload: any) => {
  const url = `${PAYSTACK_BASE_URL}/charge/submit_otp`;
  const input = {
    reference: payload.reference,
    otp: payload.otp,
  };
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(input),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

const getBank = async () => {
  const url = `${PAYSTACK_BASE_URL}/bank`;
  const response = await fetch(url, {
    method: "get",
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
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
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(input),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
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
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(input),
    headers: {
      authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};


export default {
  chargeCard,
  submitPin,
  submitPhone,
  getBank,
  accountValidityCheck,
  createTransferRecipient,
  initiateTransfer,
};
