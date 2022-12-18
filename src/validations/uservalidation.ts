import joi from "joi";
import { Iuser } from "../utils/interface";

export const registerValidation = (user: Iuser) => {
  const schema = joi.object({
    name: joi.string().min(4).max(25).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$"))
      .required(),
  });
  return schema.validate(user);
};

export const loginValidation = (login:{email:string,password:string}) => {
  const loginschema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  return loginschema.validate(login)
};
