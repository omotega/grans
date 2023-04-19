import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import * as config from '../config/database'

const db = new Sequelize(config);

export default db;



