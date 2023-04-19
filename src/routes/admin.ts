import { Router } from 'express'
const adminRouter = Router();

import { deactivateUser,activateDeactivateduser} from '../controllers/admin'
import { verifyAdmin,guard } from '../middleware/auth'

adminRouter.route('/activate/:userId').patch(guard,verifyAdmin,activateDeactivateduser);
adminRouter.route('/deactivate/:userId').patch(guard,verifyAdmin,deactivateUser);

export default adminRouter;