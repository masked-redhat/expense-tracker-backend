import dotenv from "dotenv";

dotenv.config();

const server = {
  host: process.env.host,
  port: process.env.port,
};

const mongo = {
  uri: process.env.mongo_uri,
};

const redis = {
  uri: process.env.redis_uri,
};

const env = { server, mongo, redis };

export default env;
