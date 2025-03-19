import { createClient } from "redis";
import env from "../../env/env.config.js";

export const client = createClient({ url: env.redis.uri });

client.on("error", (err) => {
  console.log("err in redis", err);
});

const connectToRedis = async () => {
  await client.connect();

  console.log("Connected to Redis");
};

export default connectToRedis;
