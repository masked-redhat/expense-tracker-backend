import _env from "./constants/env.js"; // env variables
import _connect from "./db/connect.js";
import _close from "./db/close.js";
import server from "./server/socket.js";

const port = _env.app.PORT;

// Connect to databases
// await _connect.db();
// await _connect.cache();

server.listen(port, _env.app.HOST, () => {
  console.log(`Application started on http://${_env.app.HOST}:${port}`);
});

// shutdown of the application
{
  const shutDown = async () => {
    // Close running services here
    console.debug("Gracefully closing the application");

    server.close();
    // await _close.db();
    // await _close.cache();

    console.debug("Application closed!");
  };

  process.on("SIGINT", async () => {
    console.debug("Recieved SIGINT");
    await shutDown();
  });

  process.on("SIGTERM", async () => {
    console.debug("Recieved SIGTERM/(nodemon restarts)");
    await shutDown();
  });
}
