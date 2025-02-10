import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import _env from "../constants/env.js"; // env variables
import r from "../routes/router.js";

const app = express();

// application can use cookies
app.use(express.json()); // for raw json body to be parsed
app.use(cookieParser()); // for cookies
app.use(helmet()); // many middleware functions

// public folder
app.use(express.static(_env.app.PUBLIC));

// reduce fingerprinting
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// use of _routes
// app.use("/custom_route", r.customRouter)

export default app;
