import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import _env from "../constants/env.js"; // env variables
import r from "../routes/router.js";
import auth from "../middlewares/auth.js";
import "../utils/response.js"; // predefined responses
import upload from "../middlewares/upload.js";

const app = express();

// application can use cookies
app.use(express.json()); // for raw json body to be parsed
app.use(cookieParser()); // for cookies
app.use(helmet()); // many middleware functions

app.use(upload.none()); // form fields data

app.use(auth.verify); // authentication middleware

// public folder
app.use(express.static(_env.app.PUBLIC));

// reduce fingerprinting
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

export default app;
