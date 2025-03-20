import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import env from "./env/env.config.js"; // env file
import { AppRouter } from "./routes/router.js";
import shutdown from "./utils/shutdown.js";
import connectToRedis from "./db/connect/redis.js";
import connectToMongo from "./db/connect/mongo.js";
import handleBody from "./middlewares/body.js";

const app = express();

// connect to databases
await connectToRedis();
await connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false })); // no csp at http

app.disable("x-powered-by"); // prevent fingerprinting

app.use(handleBody);

app.use("/", AppRouter); // main application router

const server = app.listen(env.server.port, env.server.host, () => {
  console.log(`Server started on http://${env.server.host}:${env.server.port}`);
});

process.on("SIGINT", async () => {
  await shutdown(server);
});
