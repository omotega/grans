import dotenv from "dotenv";
dotenv.config();

const config = {
    PORT: process.env.PORT,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_SECRET_EXPIRY_TIME: process.env.ACCESS_TOKEN_SECRET_EXPIRY_TIME ,
    REFRESH_TOKEN_SECRET_EXPIRY_TIME: process.env.REFRESH_TOKEN_SECRET_EXPIRY_TIME,
    sendgridKey: process.env.SENDGRID_API_KEY as string,
    sendgridEmail: process.env.SENDGRID_EMAIL as string,
    vtuSecretKey: process.env.VT_PASS_SECRET_KEY as string,
};

export default config;
