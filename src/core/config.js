import dotenv from "dotenv";

const env = dotenv.config().parsed || process.env;

const config = {
  port: env.PORT || 3001,
  dbUser: env.DB_USER,
  dbHost: env.DB_HOST,
  dbPort: env.DB_PORT,
  dbName: env.DB_NAME,
  dbPassword: env.DB_PASSWORD,
  jwtSecret: env.JWT_SECRET
};

export default config;