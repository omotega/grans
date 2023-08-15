import { Request, Response, NextFunction } from "express";
import Helper from "../utils/helper";
import config from "../config/config";
import { USER_NOT_FOUND } from "../utils/constant";
import userrepo from "../database/repo/userrepo";
import httpStatus from "http-status";

export const guard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const decode: any = await Helper.decodeToken(
      token,
      config.ACCESS_TOKEN_SECRET
    );
    const user = await userrepo.findUserById(decode.payload._id);
    if (!user) throw new Error(USER_NOT_FOUND);
    req.User = user;
    return next();
  } else {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "authorization not found" });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.User;
  const user = await userrepo.findUserByRole({ userId: id, role: "ADMIN" });
  if (!user) throw new Error(USER_NOT_FOUND);
  next();
};

export default {
  guard,
  verifyAdmin,
};
