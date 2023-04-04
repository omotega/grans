import Session from "../models/session";
import db from "../models/index";
import Helper from "../utils/helper";
import config from "../config/config";
import User from "../models/user";
import { Isession } from "../utils/interface";

export async function reIssueAccessToken(refreshToken: any) {
  const payload: any = await Helper.decodeToken(
    refreshToken,
    config.REFRESH_TOKEN_SECRET
  );
  console.log(payload)
  if (!payload) {
    return false;
  }
  const {  id,session } = payload.payload;
  const sessions: Isession | null = await Session.findByPk(session);
  if (!sessions) {
    return false;
  }
 
  const user = await User.findByPk(id);
  if (!user) return false;

  const accessToken = Helper.generateToken(
    { ...user.dataValues },
    config.ACCESS_TOKEN_SECRET
  );
  return accessToken;
}

export async function deleteSession(refreshToken: any) {
  const payload: any = Helper.decodeToken(
    refreshToken,
    config.REFRESH_TOKEN_SECRET
  );
  console.log(payload)
  if (!payload) {
    return false;
  }
  const {  id,session } = payload.payload;
  const sessions  = await  Session.findByPk(session);
  if (!sessions) {
    return false;
  }
  const deleteSession = await Session.destroy({where:{id:sessions.dataValues.id}});
}

