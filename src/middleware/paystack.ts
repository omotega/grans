import { NextFunction,Request, Response } from "express"
import CardTransaction from "../models/card_transaction";
import axios from "axios";
import { errorResponse, handleError } from "../utils/response";
import config from "../config/config";
import Helper from "../utils/helper";


export const transactionRef = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const reference = req.cookies.reference;
    if(!reference) {
      return errorResponse(res,401,'please initaite a card charge')
    }
    const ref = Helper.decodeToken(
      reference,
      config.ACCESS_TOKEN_SECRET
    );
    // @ts-ignore
    req.reference = ref.payload.reference;

  next();
  } catch(error) {
 handleError(req, error);
    return errorResponse(res, 500, "Something went wrong");
  }
}

export default transactionRef;
