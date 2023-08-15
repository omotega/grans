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
    userController.Register
  );

userRouter
  .route("/login")
  .post(
    userValidationMiddleware.validateLoginMiddleware,
    userController.login
  );

userRouter
  .route("/profile")
  .patch(authMiddleware.guard, userController.updateProfile);

export default userRouter;
