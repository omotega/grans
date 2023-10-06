import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
};

export default config;
