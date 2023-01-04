import { Router } from 'express'
const adminRouter = Router();

import { deactivateUser} from '../controllers/admin'
import { verifyAdmin,guard } from '../middleware/auth'


adminRouter.route('/users/deactivate/:userId').patch(guard,verifyAdmin,deactivateUser);


export default adminRouter;