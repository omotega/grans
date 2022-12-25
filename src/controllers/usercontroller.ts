import { Request, Response } from 'express';
import User from '../models/user';
import Otp from '../models/otp';
import { DuplicateError, ServerError } from '../errors/apperrors';
import Helper from '../utils/helper';
import sendEmail from '../utils/sendEmail';
import { handleError, successResponse } from '../utils/response';


export const Register = async (req: Request, res: Response) => {
  try {
    let { name, email, password, photo } = req.body;
    const isExist = await User.findOne({ where: { email } });
     if (isExist) throw new DuplicateError('user already exist');
    const hash = await Helper.hashPassword(password);
    const user = await User.create({ name, email, password: hash, photo });
    const otp = Helper.generateOtp();
    await Otp.create({ email, token: otp });
    const subject = 'User created'
    const message = `hi,thank you for signing up .Kindly verify your account with this token ${otp}`;
    await sendEmail(email, subject, message);

    return successResponse(res, 201, 'Account created successfully,kindly verify your email and login', user);

  } catch (error) {
    handleError(req, error);
    throw new ServerError('Something went wrong')
  }
}