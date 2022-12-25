import { Router } from 'express'

const userRouter = Router();

import { Register } from '../controllers/usercontroller'
import { validateRegisterMiddleware } from '../middleware/validate';

userRouter.route('/signup').post(validateRegisterMiddleware,Register);

export default userRouter;