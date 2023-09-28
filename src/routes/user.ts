import { Router } from "express";

const userRouter = Router();

import usercontroller from "../controllers/usercontroller";
import validationMiddleware from "../middleware/validate";
import authMiddleware from "../middleware/auth";
import uservalidationSchema from "../validations/uservalidation";

userRouter
  .route("/signup")
  .post(
    validationMiddleware(uservalidationSchema.registerValidation),
    usercontroller.Register
  );

userRouter
  .route("/login")
  .post(
    validationMiddleware(uservalidationSchema.loginValidation),
    usercontroller.login
  );

userRouter
  .route("/profile")
  .patch(authMiddleware.guard, usercontroller.updateProfile);

export default userRouter;
