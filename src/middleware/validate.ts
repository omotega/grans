import { Request, Response, NextFunction } from "express";
import { validateErrors, handleError } from '../utils/response'
import { loginValidation, registerValidation } from "../validations/uservalidation";
import { ServerError } from "../errors/apperrors";

export const validateRegisterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;
  try {
    const validate = registerValidation(payload);
    if (validate.error) return validateErrors(res, 406, validate.error?.details[0].message);
    next();
  } catch (error) {
    handleError(req, error)
    throw new ServerError('Something happened');
  }
}

export const loginMiddleware = (req: Request, res:Response,next: NextFunction) => {
  const payload = req.body;
  try {
    const validate = loginValidation(payload);
    if(validate.error) return validateErrors(res,406,validate.error?.details[0].message)
    next()
  } catch (error) {
    handleError(req, error)
    throw new ServerError('Something happened');
  }
}