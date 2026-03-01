import { cleanEnv, port, str } from 'envalid';

export default cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    REFRESH_TOKEN_SECRET: str(),
    MONGO_URI: str(),
    CLOUD_NAME: str(),
    API_KEY: str(),
    API_SECRET: str(),
    PAYSTACK_SECRET_KEY: str(),
    PAYSTACK_PUBLIC_KEY: str(),
    CLIENT_URL: str(),
    NODE_ENV: str(),
    PAYSTACK_WEBHOOK_SECRET: str(),
});
