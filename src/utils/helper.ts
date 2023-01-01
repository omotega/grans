import argon from "argon2";
import jwt from "jsonwebtoken";
import Otp from "otp-generator";

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
  static async comparePassword(hashedpassword: string,password: string) {
    const isMatch = await argon.verify(hashedpassword, password);
    return isMatch;
  }

  /**
   *this take some certain details of the user and genearte a token
   * @params  the user payload
   */

  static async generateToken(payload: any) {
    const token = await jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "3h",
    });
    return token;
  }

  /**
   * this gets the payload from the token
   * @params token
   * @returns payload
   */
  static async decodeToken(token: any) {
    const payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    return payload
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
    })
    return otp;
  }
}

export default Helper
