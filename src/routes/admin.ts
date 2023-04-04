import { Router } from 'express'
const adminRouter = Router();

import { deactivateUser,activateDeactivateduser} from '../controllers/admin'
import { verifyAdmin,guard } from '../middleware/auth'

adminRouter.route('/users/activate/:userId').patch(guard,verifyAdmin,activateDeactivateduser);
adminRouter.route('/users/deactivate/:userId').patch(guard,verifyAdmin,deactivateUser);

export default adminRouter;