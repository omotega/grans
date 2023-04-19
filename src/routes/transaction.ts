import { Router } from 'express'

const transactionRouter = Router();
import { deposit } from '../controllers/transactions'

transactionRouter.route('/deposit').post(deposit)

export default transactionRouter