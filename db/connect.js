import mongoose from "mongoose";
import _env from "../constants/env.js";
import retry from "../utils/reconnect.js";
import { createClient } from "redis";

const redisClient = createClient({
  url: _env.cache.URI,
  database: _env.cache.DATABASE_NUM,
});
redisClient.on("error", (err) => console.log);

const stopVal = true,
  interval = 5000;

const connectToDb = async () => {
  await retry(
    async () => {
      try {
        await mongoose.connect(_env.db.URI);

        console.log(`Connected to ${_env.db.CLIENT}`);
        return true;
      } catch (err) {
        console.log(err);
        console.log("Retrying...");
      }
      return false;
    },
    stopVal,
    interval
  );
};

const connectToCache = async () => {
  await retry(
    async () => {
      try {
        await redisClient.connect();

        console.log(`Connected to ${_env.cache.CLIENT}`);
        return true;
      } catch (err) {
        console.log(err);
        console.log("Retrying...");
      }
      return false;
    },
    stopVal,
    interval
  );
};

const _connect = {
  db: connectToDb,
  cache: connectToCache,
};

export const client = redisClient;

export default _connect;
