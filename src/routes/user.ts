import { Router } from 'express'

const userRouter = Router();

import { Register,verify,login,updateProfile,logOut } from '../controllers/usercontroller'
import { loginMiddleware, validateRegisterMiddleware } from '../middleware/validate';
import { guard } from '../middleware/auth'

userRouter.route('/users/signup').post(validateRegisterMiddleware,Register);
userRouter.route('/users/verify').post(verify);
userRouter.route('/users/login').get(login);

userRouter.route('/users/profile').patch(loginMiddleware,guard,updateProfile);
userRouter.route('/users/logout').delete(logOut);


export default userRouter;