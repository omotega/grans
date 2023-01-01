import { Router } from 'express'

const userRouter = Router();

import { Register,verify,login } from '../controllers/usercontroller'
import { loginMiddleware, validateRegisterMiddleware } from '../middleware/validate';

userRouter.route('/signup').post(validateRegisterMiddleware,Register);
userRouter.route('/verify').post(verify);
userRouter.route('/login').get(loginMiddleware,login);

export default userRouter;