import { Request, Response, NextFunction } from "express";
import userValidation from "../validations/uservalidation";
import { cardChargeValidation } from "../validations/fundwallet/cardValidation";
import httpStatus from "http-status";

const validateRegisterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const validate = userValidation.registerValidation(payload);
  if (validate.error)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: validate.error?.details[0].message });
  next();
};

const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  const validate = userValidation.loginValidation(payload);
  if (validate.error)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: validate.error?.details[0].message });
  next();
};

export default {
  validateLoginMiddleware,
  validateRegisterMiddleware,
};
