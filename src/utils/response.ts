import { Request,Response } from "express";

export const successResponse = (res:Response,statusCode:number,message:string,data:any = []) => {
    const resObj = {res,statusCode,message,data}
    return res.status(statusCode).send(resObj)
}