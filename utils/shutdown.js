import { Server } from "http";

/**
 * shutdown the application
 * @param {Server} server
 */
const shutdown = async (server) => {
  console.log("Gracefully shutting down the application");

  server.close();
  console.log("Server closed");

  console.log("Shutdown complete!");
};

export default shutdown;
