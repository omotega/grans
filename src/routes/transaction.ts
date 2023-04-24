import { Router } from 'express'

const transactionRouter = Router();
import { deposit,transfer } from '../controllers/transactions'

transactionRouter.route('/deposit').post(deposit)
transactionRouter.route('/transfer').post(transfer)

export default transactionRouter