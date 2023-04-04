import { Request, Response, NextFunction } from "express";
import { validateErrors, handleError, errorResponse } from "../utils/response";
import {
  loginValidation,
  registerValidation,
} from "../validations/uservalidation";
import { cardChargeValidation } from "../validations/cardValidation";

export const validateRegisterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const validate = registerValidation(payload);
    if (validate.error)
      return validateErrors(res, 406, validate.error?.details[0].message);
    next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const loginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const validate = loginValidation(payload);
    if (validate.error)
      return validateErrors(res, 406, validate.error?.details[0].message);
    next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const cardValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;
  try {
    const validate = cardChargeValidation(payload);
    if (validate.error)
      return validateErrors(res, 406, validate.error?.details[0].message);
    next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};
