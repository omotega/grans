import { Router } from 'express'

const userRouter = Router();

import { Register,verify,login,updateProfile } from '../controllers/usercontroller'
import { loginMiddleware, validateRegisterMiddleware } from '../middleware/validate';
import { guard  } from '../middleware/auth'

userRouter.route('/users/signup').post(validateRegisterMiddleware,Register);
userRouter.route('/users/verify').post(verify);
userRouter.route('/users/login').get(loginMiddleware,login);

userRouter.route('/users/profile').patch(guard,updateProfile);

export default userRouter;