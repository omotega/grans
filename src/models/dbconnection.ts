import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const Dbconnection = new Sequelize('dbtega',process.env.DB_USERNAME as string,process.env.DB_PASSWORD as string,{
  host: 'localhost',
  dialect:'postgres',
  // models: [__dirname + '/src/models/']
}) 


