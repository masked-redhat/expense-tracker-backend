import { client } from "../connect/redis.js";

const closeRedis = async () => {
  await client.disconnect();

  console.log("Closed Redis Connection");
};

export default closeRedis;
