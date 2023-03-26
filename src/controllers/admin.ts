import { Request, Response } from "express";
import User from "../models/user";
import db from "../models/index";
import { NotFoundError, ServerError } from "../errors/apperrors";
import { handleError, successResponse } from "../utils/response";

import Helper from "../utils/helper";

export const deactivateUser = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId }, transaction: t });
    if (!user) throw new NotFoundError("user not found");
    await user.update({ active: false }, { transaction: t });
    const details = Helper.excludeFields(["password"], user);
    await t.commit();
    return successResponse(res, 200, "user deactivated", details);
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    throw new ServerError("something happened");
  }
};
export const activateDeactivateduser = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId }, transaction: t });
    if (!user) throw new NotFoundError("user not found");
    if (user.active != true) {
      await user.update({ active: true }, { transaction: t });
    }
    const details = Helper.excludeFields(["password"], user);
    await t.commit();
    return successResponse(res, 200, "user deactivated", details);
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    throw new ServerError("something happened");
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const t = await db.transaction();
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId }, transaction: t });
    if (!user) throw new NotFoundError("user not found");
    await user.update({ role: "vendor" }, { transaction: t });
    const details = Helper.excludeFields(["password"], user);
    await t.commit();
    return successResponse(res, 200, "user deactivated", details);
  } catch (error) {
    await t.rollback();
    handleError(req, error);
    throw new ServerError("something happened");
  }
};
