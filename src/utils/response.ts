import { Request, Response } from "express";

export function errorResponse(res: Response, statusCode: number, error: string) {
  const resobj = { statusCode, error };
  return res.status(statusCode).send(resobj);
}


export function successResponse(res: Response, statusCode: number, message: string, data: any = []) {
  const resObj = {  statusCode, message, data }
  return res.status(statusCode).send(resObj)
}

export function validateErrors(res: Response, statusCode: number, error: any) {
  const resObj = { statusCode, error };
  return res.status(statusCode).send(resObj);
}

export function handleError(req: Request, error: any) {
  console.log(`
        Error message: ${JSON.stringify(error.message)},
        Caught At:${JSON.stringify(req.path)}.

    `)
}

