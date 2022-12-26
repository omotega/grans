import { Request, Response } from 'express';
import User from '../models/user';
import Otp from '../models/otp';
import { BadRequestError, DuplicateError, NotFoundError, ServerError } from '../errors/apperrors';
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
    console.log(otp)
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

export const verify = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    const isOtp = await Otp.findOne({ where: { token: otp } });
    if (!isOtp) throw new NotFoundError('otp not found');
    if (isOtp.expired != false) throw new BadRequestError('otp has expired');
    console.log(isOtp.expired);
    await user?.update({ verified: true });
    await isOtp.update({ expired: true });
    console.log(isOtp.expired);
    return successResponse(res, 200, 'user account verified successfully',user);
  } catch (error) {
    handleError(req, error);
    throw new ServerError('Something went wrong')
  }
}
