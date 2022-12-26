import { Router } from 'express'

const userRouter = Router();

import { Register,verify } from '../controllers/usercontroller'
import { validateRegisterMiddleware } from '../middleware/validate';

userRouter.route('/signup').post(validateRegisterMiddleware,Register);
userRouter.route('/verify').post(verify);

export default userRouter;