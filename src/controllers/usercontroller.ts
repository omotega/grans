import { Request, Response } from "express";
import User from "../models/user";
import Otp from "../models/otp";
import Account from "../models/account";
import db from '../models/index'
import {
  BadRequestError,
  DuplicateError,
  NotFoundError,
  ServerError,
} from "../errors/apperrors";
import Helper from "../utils/helper";
import sendEmail from "../utils/sendEmail";
import { handleError, successResponse } from "../utils/response";

export const Register = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    let { name, email, password, photo } = req.body;
    const isExist = await User.findOne({ where: { email },transaction:t });
    if (isExist) throw new DuplicateError("user already exist");
    const hash = await Helper.hashPassword(password);
    const user = await User.create({ name, email, password: hash, photo },{transaction:t});
    const account = await Account.create({userId:user.id, balance:1000},{transaction:t});
    const otp = Helper.generateOtp();
    console.log(otp);
    await Otp.create({ email, token:otp });
    const subject = "User created";
    const message = `hi,thank you for signing up .Kindly verify your account with this token ${otp}`;
    await sendEmail(email, subject, message);
    await t.commit();

    return successResponse(
      res,
      201,
      "Account created successfully,kindly verify your email and login",
      user
    );
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    throw new ServerError("Something went wrong");
  }
};

export const verify = async (req: Request, res: Response) => {
  const t = await db.transaction()
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["password"] }, transaction:t
    });
    const isOtp = await Otp.findOne({ where: { token: otp },transaction:t });
    if (!isOtp) throw new NotFoundError("otp not found");
    if (isOtp.expired != false) throw new BadRequestError("otp has expired");
    await user?.update({ verified: true });
    await isOtp.update({ expired: true });
    await t.commit()
    return successResponse(
      res,
      200,
      "user account verified successfully",
      user
    );
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    throw new ServerError("Something went wrong");
  }
};

export const login = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { email, password } = req.body;
    const user = await User.findOne({where: { email },transaction:t });
    if (!user) throw new NotFoundError("user not found");
    if (!user.verified)
      throw new BadRequestError("please verify your account before logging");
    if (!user.active)
      throw new BadRequestError(
        "user account deactivated,kindly activate your account"
      );
    const isPassword = await Helper.comparePassword(user.password,password);
    if (!isPassword) throw new BadRequestError("incorrect password");
    const token = await Helper.generateToken({
      id: user.id,
      email: user.email,
    });
    await t.commit()
    return successResponse(res, 200, "User logged in successfully", {
      token,
      user,
    });
  } catch (error) {
    await t.rollback()
    handleError(req, error);
    throw new ServerError("Something went wrong");
  }
};