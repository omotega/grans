import paystackServices from "../paystack";
import transactionhelpers from "../../helpers/transactions";
import {
  CARD_TRANSACTION_ERROR,
  CARD_TRANSACTION_SUCCESSFUL,
  CREDIT_FAILED,
  SOMETHING_HAPPENED,
  SUBMIT_OTP,
  SUBMIT_PIN,
} from "../../utils/constant";
import cardtransactionrrepo from "../../database/repo/cardtransactionrrepo";
import { AppError } from "../../utils/error";
import httpStatus from "http-status";

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
  if (!card_transaction)   throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CARD_TRANSACTION_ERROR,
  });
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
  if (!card_transaction) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CARD_TRANSACTION_ERROR,
  });;
}

async function fundWalletWithCard(payload: {
  number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  email: string;
  amount: number;
  userId: string;
}) {
  const { number, expiry_month, expiry_year, cvv, email, amount, userId } =
    payload;
  const charge = await paystackServices.chargeCard({
    number,
    expiry_month,
    expiry_year,
    cvv,
    amount,
    email,
  });
  const accountId = await transactionhelpers.getUserAccountId(userId);
  if (charge.data.status === "send_pin") {
    const response = await whenPaystackResposeIsSubmitPin({
      amount: amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    return {
      status: true,
      message: SUBMIT_PIN,
      reference: charge.data.reference,
    };
  } else if (charge.data.status === "success") {
    const response = await whenPaystackResposeIsSuccess({
      amount: amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    return { status: true, message: CARD_TRANSACTION_SUCCESSFUL };
  } else {
    throw new AppError({
      httpCode: httpStatus.INTERNAL_SERVER_ERROR,
      description: SOMETHING_HAPPENED,
    });;
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
  if (!credit.status) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CREDIT_FAILED,
  });;
  const card_transaction =
    await cardtransactionrrepo.updateCardtransactionByReference(
      reference,
      status
    );
  if (!card_transaction) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CARD_TRANSACTION_ERROR,
  });
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
  if (!card_transaction) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CARD_TRANSACTION_ERROR,
  });
}

async function submitPin(payload: {
  pin: string;
  reference: string;
  userId: string;
}) {
  const { pin, userId, reference } = payload;
  const charge = await paystackServices.submitPin({ pin, reference });
  const accountId = await transactionhelpers.getUserAccountId(userId);
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

    return { status: true, message: SUBMIT_OTP, reference: reference };
  } else {
    throw new AppError({
      httpCode: httpStatus.INTERNAL_SERVER_ERROR,
      description: SOMETHING_HAPPENED,
    });
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
  if (!credit.status) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CREDIT_FAILED,
  });;
  const card_transaction =
    await cardtransactionrrepo.updateCardtransactionByReference(
      reference,
      status
    );
  if (!card_transaction) throw new AppError({
    httpCode: httpStatus.INTERNAL_SERVER_ERROR,
    description: CARD_TRANSACTION_ERROR,
  });
}

async function submitPhone(payload: {
  otp: string;
  reference: string;
  userId: string;
}) {
  const { otp, reference, userId } = payload;
  const accountId = await transactionhelpers.getUserAccountId(userId);
  const charge = await paystackServices.submitPhone({ otp, reference });
  if (charge.data.status === "success") {
    const response = await whenPaystackResponseIsSuccessForSubmitphone({
      amount: charge.data.amount,
      accountId: accountId,
      reference: charge.data.reference,
      status: charge.data.status,
    });
    console.log(response, "THIS IS THE RESPONSE OOO");
    return { status: true, message: CARD_TRANSACTION_SUCCESSFUL };
  } else {
    throw new AppError({
      httpCode: httpStatus.INTERNAL_SERVER_ERROR,
      description: SOMETHING_HAPPENED,
    });
  }
}

export default {
  fundWalletWithCard,
  submitPin,
  submitPhone,
};
