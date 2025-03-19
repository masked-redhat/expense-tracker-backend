import { Server } from "http";
import closeMongo from "../db/close/mongo.js";
import closeRedis from "../db/close/redis.js";

/**
 * shutdown the application
 * @param {Server} server
 */
const shutdown = async (server) => {
  console.log("Gracefully shutting down the application");

  await closeMongo();
  await closeRedis();
  console.log("Database connections closed");

  server.close();
  console.log("Server closed");

  console.log("Shutdown complete!");
};

export default shutdown;
