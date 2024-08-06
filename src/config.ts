import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  DATABASE_URL: process.env.DATABASE_URL || "",
};
