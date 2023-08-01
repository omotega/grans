import userrepo from "../database/repo/userrepo";
import accountrepo from "../database/repo/accountrepo";
import {
  INCORRECT_PASSWORD,
  USER_ALREADY_EXIST,
  USER_NOT_FOUND,
} from "../utils/constant";
import Helper from "../utils/helper";

async function register(payload: {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  phoneNumber: string;
}) {
  const { name, email, password, profilePicture, phoneNumber } = payload;
  const isExist = await userrepo.findUserByEmail(email);
  if (isExist) throw new Error(USER_ALREADY_EXIST);
  const hash = await Helper.hashPassword(password);
  const accountNumber = await Helper.generateRandomUnique6DigitNumber();
  const user = await userrepo.createUser({
    name,
    email,
    phoneNumber,
    password: hash,
    profilePicture,
    verified: true,
  });
  const account = await accountrepo.createAccount({
    userId: user.id,
    balance: 10000,
    accountNumber: accountNumber,
  });

  return user;
}

async function login(payload: { email: string; password: string }) {
  const { email, password } = payload;
  const isUser = await userrepo.findUserByEmail(email);
  if (!isUser) throw new Error(USER_NOT_FOUND);
  const isPassword = await Helper.comparePassword(isUser.password, password);
  if (!isPassword) throw new Error(INCORRECT_PASSWORD);
  
}

export default {
  register,
};
