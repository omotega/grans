import { Request, Response, NextFunction } from "express";
import Helper from "../utils/helper";
import config from "../config/config";
import { USER_NOT_FOUND } from "../utils/constant";
import userrepo from "../database/repo/userrepo";
import httpStatus from "http-status";
import { AppError } from "../utils/error";

export const guard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (!token)
        throw new AppError({
          httpCode: httpStatus.FORBIDDEN,
          description: "please login",
        });
      const decode: any = await Helper.decodeToken(
        token,
        config.ACCESS_TOKEN_SECRET
      );
      const user = await userrepo.findUserById(decode.payload._id);
      if (!user)
        throw new AppError({
          httpCode: httpStatus.NOT_FOUND,
          description: USER_NOT_FOUND,
        });
      req.User = user;
      return next();
    } else {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "authorization not found" });
    }
  } catch (error: any) {
    throw new AppError({
      httpCode: httpStatus.FORBIDDEN,
      description: "please login",
    });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.User;
  const user = await userrepo.findUserByRole({ userId: id, role: "ADMIN" });
  if (!user)
    throw new AppError({
      httpCode: httpStatus.NOT_FOUND,
      description: USER_NOT_FOUND,
    });
  next();
};

export default {
  guard,
  verifyAdmin,
};
