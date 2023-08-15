import { Router } from "express";
import { wrapController } from "../utils/catchasync";

const userRouter = Router();

import usercontrollerfunction from "../controllers/usercontroller";
const userController = wrapController(usercontrollerfunction);
import userValidationMiddleware from "../middleware/validate";
import authMiddleware from "../middleware/auth";

userRouter
  .route("/signup")
  .post(
    userValidationMiddleware.validateRegisterMiddleware,
    usercontrollerfunction.Register
  );

userRouter
  .route("/login")
  .post(
    userValidationMiddleware.validateLoginMiddleware,
    usercontrollerfunction.login
  );

userRouter
  .route("/profile")
  .patch(authMiddleware.guard, usercontrollerfunction.updateProfile);

export default userRouter;
