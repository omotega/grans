import app from './app'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT

const server = app.listen(port, () => {
  console.log(`server connected on port ${port}`);
})

process.on('unhandledRejection', (error: any) => {
  console.log(`unhandledRejection: ${error.message}`)
  server.close(() => process.exit(1));
})
