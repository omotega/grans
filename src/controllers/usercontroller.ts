import { Request, Response } from "express";
import Helper from "../utils/helper";
import userservices from "../services/userservices";
import httpStatus from "http-status";
import { LOGIN_SUCCESSFUL, SIGNUP_SUCCESSFUL } from "../utils/constant";

const Register = async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, phoneNumber } = req.body;
  const response = await userservices.register({
    name,
    email,
    password,
    profilePicture,
    phoneNumber,
  });
  res.status(httpStatus.CREATED).json({
    message: SIGNUP_SUCCESSFUL,
    user: Helper.excludeFields(["password"], response),
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await userservices.login({
    email: email,
    password: password,
  });
  res.status(httpStatus.OK).json({
    message: LOGIN_SUCCESSFUL,
    user: Helper.excludeFields(["password"], response),
  });
};

export default {
  Register,
  login,
};
