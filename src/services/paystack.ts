import fetch from "node-fetch";
import config from "../config/config";

const PAYSTACK_BASE_URL = "https://api.paystack.co/charge";

const chargeCard = async (payload: any) => {
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
  const url = `${PAYSTACK_BASE_URL}/submit_pin`;
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
  const url = `${PAYSTACK_BASE_URL}/submit_otp`;
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
  console.log(data,'what is the data')
  return data;
  
};

export default {
  chargeCard,
  submitPin,
  submitPhone,
};
