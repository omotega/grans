import joi from "joi";

const registerValidation = {
  body: joi.object({
    name: joi.string().min(4).max(25).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phoneNumber: joi.string().required(),
  }),
};

const loginValidation = {
  body: joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};



export default {
  registerValidation,
  loginValidation,
};
