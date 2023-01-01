import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Helper from "../utils/helper";
import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from "../errors/apperrors";
import { handleError } from "../utils/response";

export const guard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decode: any = await Helper.decodeToken(token);
      const user = await User.findByPk(decode.id);
      if (!user) throw new NotFoundError("user not found");
      req.user = user;
      return next();
    } else {
      throw new UnauthorizedError("Authorization not found");
    }
  } catch (error:any) {
    handleError(req, error);
    throw new ServerError("Something went wrong");
  }
};
