import { Request, Response } from "express";
import config from "../config/config";
import Helper from "../utils/helper";
import userservices from "../services/userservices";
import httpStatus from "http-status";
import { SIGNUP_SUCCESSFUL } from "../utils/constant";

export const Register = async (req: Request, res: Response) => {
  const { name, email, password, profilePicture, phoneNumber } = req.body;
  const response = await userservices.register({
    name,
    email,
    password,
    profilePicture,
    phoneNumber,
  });
  res
    .status(httpStatus.CREATED)
    .json({
      message: SIGNUP_SUCCESSFUL,
      user: Helper.excludeFields(["password"], response),
    });
};


export const login = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, transaction: t });
    if (!user) return errorResponse(res, 404, "user not found");
    if (!user.verified)
      return errorResponse(
        res,
        400,
        "please verify your account before logging"
      );
    if (!user.active)
      return errorResponse(
        res,
        400,
        "user account deactivated,kindly activate your account"
      );
    const isPassword = await Helper.comparePassword(user.password, password);
    if (!isPassword) return errorResponse(res, 400, "incorrect password");

    const session = await Session.create(
      { user: user.dataValues.id },
      { transaction: t }
    );

    const accessToken = await Helper.generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        session: session.dataValues.id,
      },
      config.ACCESS_TOKEN_SECRET
    );

    const refreshToken = await Helper.generateToken(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        session: session.dataValues.id,
      },
      config.REFRESH_TOKEN_SECRET
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 900000,
      httpOnly: true,
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
      path: "/",
    });

    const details = Helper.excludeFields(["password"], user.dataValues);
    await t.commit();
    return successResponse(res, 200, "User logged in successfully", {
      details,
    });
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { name, email, password } = req.body;
    const { id } = req.User;
    const user = await User.findOne({ where: { id }, transaction: t });
    if (!user) return errorResponse(res, 404, "user not found");
    if (user.id != id) return errorResponse(res, 401, "user not authorized");
    const hash = await Helper.hashPassword(password);
    await user.update(
      { name: name, password: hash, email: email },
      { transaction: t }
    );
    const details = Helper.excludeFields(["password"], user.dataValues);
    await t.commit();
    return successResponse(
      res,
      200,
      "user information updated successfully",
      details
    );
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const deletedsession = await deleteSession(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return successResponse(res, 200, "User logged out");
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
};
