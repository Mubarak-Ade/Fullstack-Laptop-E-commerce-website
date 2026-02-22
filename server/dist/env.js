import { cleanEnv, port, str } from "envalid";
export default cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    MONGO_URI: str(),
    CLOUD_NAME: str(),
    API_KEY: str(),
    API_SECRET: str()
});
