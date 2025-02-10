import dotenv from "dotenv";
dotenv.config();

const APP = {
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  PUBLIC: "./" + "public", // change according to your folder name
};

// Mongodb as nosql db
const MONGODB = {
  CLIENT: "Mongo DB",
  URI: process.env.MONGO_DB_URI,
};

// Redis as cache
const REDIS = {
  CLIENT: "Redis",
  URI: process.env.REDIS_DB_URI,
  DATABASE_NUM: parseInt(process.env.REDIS_DB_NUM) ?? 3,
};

// JSON Web Token
const JWT = {
  SECRET: process.env.SECRET ?? "supersecret",
};

const _env = {
  app: APP,
  db: MONGODB,
  cache: REDIS,
  jwt: JWT,
};

export default _env;
