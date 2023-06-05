import { Router } from 'express'

const transactionRouter = Router();
import { deposit,transfer,withdrawl } from '../controllers/transactions'
import { guard } from '../middleware/auth';

transactionRouter.route('/deposit').post(deposit)
transactionRouter.route('/transfer').post(guard,transfer)
transactionRouter.route('/withdrawl').post(guard,withdrawl)

export default transactionRouter