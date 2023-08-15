import joi from "joi";
import { Iuser } from "../types/user";

const registerValidation = (user: Iuser) => {
  const schema = joi.object({
    name: joi.string().min(4).max(25).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phoneNumber: joi.string().required(),
  });
  return schema.validate(user);
};

const loginValidation = (login: { email: string; password: string }) => {
  const loginschema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return loginschema.validate(login);
};

export default {
  registerValidation,
  loginValidation,
};
