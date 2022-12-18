import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
const prismaClient = new PrismaClient();


import ErrorHandler from './middleware/errormiddleware';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(ErrorHandler);

export default app