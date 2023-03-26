import Session from "../models/session";
import db from "../models/index";
import Helper from "../utils/helper";
import config from "../config/config";
import User from "../models/user";
import { Isession } from "../utils/interface";

 const refreshToken =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImVtYWlsIjoib21vdGVnYTIyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic2Vzc2lvbiI6Ijk5NDAzMTA5LTlkNjItNGNmMS04ZGU3LWFmZDcyMTI0OWMxYyIsImlhdCI6MTY3OTc4OTU2MSwiZXhwIjoxNjc5NzkzMTYxfQ.4crf3LZExabDyrB7HK0VECVetYJPHkPN1A2aXZJHz5k'
// const payload = Helper.decodeToken(refreshToken,config.REFRESH_TOKEN_SECRET);
// console.log(payload)
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

