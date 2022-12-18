import { Request, Response, NextFunction } from "express";
import {  BaseError } from "../errors/apperrors";

const sendErrorInDev = (errObj: any, res: Response) => {
  console.log(errObj);
  res.status(errObj.statusCode).json({
    status: errObj.status,
    message: errObj.message,
    error: errObj,
    stack: errObj.stack,
  });
};

const sendErrorInProduction = (errObj: any, res: Response) => {
  res.status(errObj.statusCode).json({ status: errObj.status, message: errObj.message });
};

export = (errObj: BaseError, req: Request, res: Response, next: NextFunction) => {
  errObj.statusCode = errObj.statusCode || 500;
  errObj.status = errObj.status || 'Something went wrong'

  if (process.env.NODE_ENV === 'development') {
    sendErrorInDev(errObj, res)
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorInProduction(errObj, res)

  }
}
