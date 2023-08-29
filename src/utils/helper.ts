import argon from "argon2";
import jwt from "jsonwebtoken";
import Otp from "otp-generator";
import config from "../config/config";
import { v4 } from "uuid";
import moment from "moment";
import crypto from "crypto";

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

  static generateToken(payload: any, secret = config.ACCESS_TOKEN_SECRET) {
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    return token;
  }
  static generateRefreshToken = async (payload: any) => {
    await Helper.generateToken(payload, config.REFRESH_TOKEN_SECRET);
  };

  static generateAccesToken = async (payload: any) => {
    await Helper.generateToken(payload, config.ACCESS_TOKEN_SECRET);
  };

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

  static generateRandomUnique6DigitNumber = async (): Promise<any> => {
    let generatedNumbers: any = [];
    var randomNumber = Math.floor(Math.random() * 900000 + 100000);

    var isUnique = true;
    for (var i = 0; i < generatedNumbers.length; i++) {
      if (randomNumber === generatedNumbers[i]) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) {
      return randomNumber;
    } else {
      return Helper.generateRandomUnique6DigitNumber();
    }
  };

  static generateReference = async () => {
    const reference = v4();
    return reference;
  };

  static generateVtuRequestId = async () => {
    const result =
      moment().format("YYYYMMDDHHmm") +
      "" +
      crypto.randomBytes(10).toString("hex");
    return result;
  };
}

Helper.generateVtuRequestId().then(console.log).catch(console.log);
export default Helper;
