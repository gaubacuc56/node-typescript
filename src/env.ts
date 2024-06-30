import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const env = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET!,
};

export default env;
