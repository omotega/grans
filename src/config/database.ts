import dotenv from 'dotenv';
dotenv.config();
import { Options } from 'sequelize'


const config:Options = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": "dbtega",
  "host": process.env.DB_HOST,
  "dialect": "postgres",
  logging:false,
}

module.exports = config;

