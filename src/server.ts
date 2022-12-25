import app from './app'
import dotenv from 'dotenv'
dotenv.config();

import { Dbconnection } from './models/dbconnection'


const port = process.env.PORT || 6666;

 app.listen(port, async () => {
  console.log(`server connected on port ${port}`);
  try {
    await Dbconnection.authenticate();
    console.log('database connected')
  } catch (error: any) {
    console.log(error.message);
  }
})

process.on('unhandledRejection', (error: any) => {
  console.log(`unhandledRejection: ${error.message}`)
  process.exit(1);
})
