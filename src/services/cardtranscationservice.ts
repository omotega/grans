import paystackServices from "./paystack";
import transactionhelpers from "../helpers/transactions";
import {
  CARD_TRANSACTION_ERROR,
  CARD_TRANSACTION_SUCCESSFUL,
  CREDIT_FAILED,
  SOMETHING_HAPPENED,
  SUBMIT_PHONE,
  SUBMIT_PIN,
} from "../utils/constant";
import cardtransactionrrepo from "../database/repo/cardtransactionrrepo";

async function whenPaystackResposeIsSubmitPin(payload: {
  amount: number;
  reference: string;
  accountId: string;
  status: string;
}) {
  const { amount, accountId, reference, status } = payload;
  const card_transaction = await cardtransactionrrepo.createCardtransaction({
    externalReference: reference,
    accountId: accountId,
    amount: amount,
    lastResponse: status,
  });
  if (!card_transaction) throw new Error(CARD_TRANSACTION_ERROR);
}

async function whenPaystackResposeIsSuccess(payload: {
  amount: number;
  accountId: string;
  reference: string;
  status: string;
}) {
  const { amount, accountId, reference, status } = payload;

  const credit = await transactionhelpers.creditAccount({
    amount: amount,
    accountId: accountId,
    purpose: "CARDFUNDING",
  });
  if (!credit.status) throw new Error(CREDIT_FAILED);
  const card_transaction = await cardtransactionrrepo.createCardtransaction({
    externalReference: reference,
    accountId: accountId,
    amount: amount,
    lastResponse: status,
  });
  if (!card_transaction) throw new Error(CARD_TRANSACTION_ERROR);
}

async function fundWalletWithCard(payload: {
  number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  email: string;
  amount: number;
  accountId: string;
}) {
  const { number, expiry_month, expiry_year, cvv, email, amount, accountId } =
    payload;
  const charge = await paystackServices.chargeCard({
    number,
    expiry_month,
    expiry_year,
    cvv,
    amount,
    email,
  });
  if (charge.data.status === "send_pin") {
    const response = await whenPaystackResposeIsSubmitPin({
      amount: amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    return { status: true, message: SUBMIT_PIN };
  } else if (charge.data.status === "success") {
    const response = await whenPaystackResposeIsSuccess({
      amount: amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    return { status: true, message: CARD_TRANSACTION_SUCCESSFUL };
  } else {
    throw new Error(SOMETHING_HAPPENED);
  }
}

async function whenPaystackResponseIsSuccessForSubmitpin(payload: any) {
  const { amount, accountId, reference, status } = payload;

  const credit = await transactionhelpers.creditAccount({
    amount: amount,
    accountId: accountId,
    purpose: "CARDFUNDING",
    metadata: {
      externalReference: reference,
    },
  });
  if (!credit.status) throw new Error(CREDIT_FAILED);
  const card_transaction =
    await cardtransactionrrepo.updateCardtransactionByReference(
      reference,
      status
    );
  if (!card_transaction) throw new Error(CARD_TRANSACTION_ERROR);
}

async function whenPaystackResposeIsSubmitPhone(payload: {
  reference: string;
  status: string;
}) {
  const { reference, status } = payload;
  const card_transaction =
    await cardtransactionrrepo.updateCardtransactionByReference(
      reference,
      status
    );
  if (!card_transaction) throw new Error(CARD_TRANSACTION_ERROR);
}

async function submitPin(payload: {
  pin: string;
  reference: string;
  accountId: string;
}) {
  const { pin, accountId, reference } = payload;
  const charge = await paystackServices.submitPin({ pin, reference });
  if (charge.data.status === "success") {
    const response = await whenPaystackResponseIsSuccessForSubmitpin({
      amount: charge.data.amount,
      accountId,
      reference,
      status: charge.data.status,
    });

    return { status: true, message: CARD_TRANSACTION_SUCCESSFUL };
  } else if (charge.data.status === "send_otp") {
    const response = await whenPaystackResposeIsSubmitPhone({
      reference,
      status: charge.data.status,
    });
    return { status: true, message: SUBMIT_PHONE };
  } else {
    throw new Error(SOMETHING_HAPPENED);
  }
}

async function whenPaystackResponseIsSuccessForSubmitphone(payload: any) {
  const { amount, accountId, reference, status } = payload;

  const credit = await transactionhelpers.creditAccount({
    amount: amount,
    accountId: accountId,
    purpose: "CARDFUNDING",
    metadata: {
      externalReference: reference,
    },
  });
  if (!credit.status) throw new Error(CREDIT_FAILED);
  const card_transaction =
    await cardtransactionrrepo.updateCardtransactionByReference(
      reference,
      status
    );
  if (!card_transaction) throw new Error(CARD_TRANSACTION_ERROR);
}

async function submitPhone(payload: {
  otp: string;
  reference: string;
  accountId: string;
}) {
  const { otp, reference, accountId } = payload;
  const charge = await paystackServices.submitPhone({ otp, reference });
  if (charge.data.status === "success") {
    const response = await whenPaystackResponseIsSuccessForSubmitphone({
      amount: charge.data.amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    return { status: true, message: CARD_TRANSACTION_SUCCESSFUL };
  } else {
    throw new Error(SOMETHING_HAPPENED);
  }
}

export default {
  fundWalletWithCard,
  submitPin,
  submitPhone,
};
