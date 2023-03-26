import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_SECRET_EXPIRY_TIME: process.env.ACCESS_TOKEN_SECRET_EXPIRY_TIME ,
    REFRESH_TOKEN_SECRET_EXPIRY_TIME: process.env.REFRESH_TOKEN_SECRET_EXPIRY_TIME,
};

export default config;
