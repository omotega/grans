import { Router } from 'express'

const transactionRouter = Router();
import { deposit,transfer } from '../controllers/transactions'
import { guard } from '../middleware/auth';

transactionRouter.route('/deposit').post(deposit)
transactionRouter.route('/transfer').post(guard,transfer)

export default transactionRouter