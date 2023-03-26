import app from './app'
import dotenv from 'dotenv'
dotenv.config();

import logger from './logger/logger';

import { Dbconnection } from './models/dbconnection'


const port = process.env.PORT || 6666;

 app.listen(port, async () => {
  console.log(`server connected on port ${port}`);
  try {
    await Dbconnection.authenticate();
    logger.info('database connected')
  } catch (error: any) {
    logger.error(error.message);
  }
})

process.on('unhandledRejection', (error: any) => {
  logger.info(`unhandledRejection: ${error.message}`)
  process.exit(1);
})
