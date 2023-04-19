import adminRouter  from './admin'
import cardTransactionRouter from './cardTransaction'
import userRouter from './user';
import transactionRouter from './transaction';

const route = { adminRouter,cardTransactionRouter,userRouter,transactionRouter };
export default route;