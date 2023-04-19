import { Router } from 'express'

const userRouter = Router();

import { Register,verify,login,updateProfile,logOut } from '../controllers/usercontroller'
import { loginMiddleware, validateRegisterMiddleware } from '../middleware/validate';
import { guard } from '../middleware/auth'

userRouter.route('/signup').post(validateRegisterMiddleware,Register);
userRouter.route('/verify').post(verify);
userRouter.route('/login').get(loginMiddleware,login);

userRouter.route('/profile').patch(guard,updateProfile);
userRouter.route('/logout').delete(logOut);


export default userRouter;