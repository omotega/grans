import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Helper from "../utils/helper";
import { errorResponse, handleError } from "../utils/response";
import config from "../config/config";
import Session from "../models/session";
import { reIssueAccessToken } from "../services/session";

export const guard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  try {
    let newAccessToken;
    let payload;
    const result: any = Helper.decodeToken(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );
    if (accessToken === undefined && refreshToken === undefined) {
      return errorResponse(res, 400, "please login");
    } else if (accessToken === undefined && result.expired === false) {
      newAccessToken = await reIssueAccessToken(refreshToken);
      if (!newAccessToken) return next();
      req.cookies.accessToken = newAccessToken;
      const newToken = Helper.decodeToken(
        newAccessToken,
        config.ACCESS_TOKEN_SECRET
      );
      // @ts-ignore
      req.User = newToken.payload;
      return next();
    } else {
      payload = Helper.decodeToken(accessToken, config.ACCESS_TOKEN_SECRET);
      if (payload) {
        // @ts-ignore
        req.User = payload.payload;
        return next();
      }
    }
    return next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.User;
    const user = await User.findOne({ where: { id, role: "admin" } });
    if (!user)
      return errorResponse(res, 401, "user not an admin,not authorized");
    return next();
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};
