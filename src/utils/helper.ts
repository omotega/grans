import argon from "argon2";
import jwt from "jsonwebtoken";
import Otp from "otp-generator";
import config from "../config/config";

const ACCESS_SECRET = config.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = config.REFRESH_TOKEN_SECRET;

/**
 * contains all the helper methods
 * @class helper
 */
class Helper {
  /**
   * it hash the user password
   * @params the user password to be hashed
   * @return the hashed user password
   */
  static async hashPassword(password: string) {
    const hashedpassword = await argon.hash(password);
    return hashedpassword;
  }

  /**
   * it compared the user password and the hashed password
   * @params the user password
   */
  static async comparePassword(hashedpassword: string, password: string) {
    const isMatch = await argon.verify(hashedpassword, password);
    return isMatch;
  }

  /**
   *this take some certain details of the user and genearte a token
   * @params  the user payload
   */

  static generateToken(payload: any, secret: string) {
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    return token;
  }

  /**
   * this gets the payload from the token
   * @params token
   * @returns payload
   */

  static decodeToken(token: any, secret: string) {
    const payload = jwt.verify(token, secret);
    return {
      valid: true,
      expired: false,
      payload,
    };
  }
  /**
   * this is to generate otp for the user
   */
  static generateOtp() {
    let otp = Otp.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    return otp;
  }
  /**
   * utility function to exclude certain fields that should not be shown to the client
   */

  static excludeFields = (fields: string[], objects: any) => {
    const exclude = new Set(fields);
    const result = Object.fromEntries(
      Object.entries(objects).filter((e) => !exclude.has(e[0]))
    );

    return result;
  };
}

export default Helper;
