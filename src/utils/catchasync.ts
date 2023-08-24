import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";

type Handler = RequestHandler<any>;
type Controller<T extends string> = Record<T, Handler>;

export function wrapController<T extends string>(
  controller: Record<T, any>
): Controller<T> {
  const newController = {} as Controller<T>;
//@ts-ignore
  Object.keys(controller).forEach((key: T) => {
    if (typeof controller[key] === "function") {
      newController[key] = asyncHandler(controller[key]);
    }
  });
  return newController;
}

