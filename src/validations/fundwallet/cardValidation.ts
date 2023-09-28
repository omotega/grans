import joi from "joi";

export const cardChargeValidation = {
  body: joi.object({
    accountId: joi.number().required,
    pan: joi.string().required(),
    expiry_year: joi.string().min(2).max(4).required(),
    expiry_month: joi.string().min(2).max(4).required(),
    cvv: joi.string().required(),
    email: joi.string().email().required(),
    amount: joi.number().required(),
  }),
};
