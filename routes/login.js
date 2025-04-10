import { Router } from "express";
import User from "../models/User.js";
import { loggedIn, setupAuth } from "../middlewares/auth/auth.js";
import { client } from "../db/connect/redis.js";
import { isUsernameAvailable } from "../utils/username.js";

const router = Router();

router.post("/login", async (req, res) => {
  const body = req.body;

  try {
    const notGiven = body.anyNuldefined("username password");
    if (notGiven.length !== 0)
      return res.failure("Required : " + notGiven.join(" "));

    const [username, password] = body.bulkGet("username password");

    const user = await User.findOne({ username });
    if (user === null) return res.unauth("Bad username");
    if (password !== user.password) return res.unauth("Wrong password");

    const userToken = await setupAuth(user.username);

    res.ok("Login successful", { userToken });
  } catch (err) {
    console.log(err);

    res.serverError();
  }
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  try {
    const notGiven = body.anyNuldefined("username password");
    if (notGiven.length !== 0)
      return res.failure("Required : " + notGiven.join(" "));

    const [username, password] = body.bulkGet("username password");

    let available = await isUsernameAvailable(username);
    if (!available) return res.conflict("username already exist");

    const user = await User.create({ username, password });

    const userToken = await setupAuth(user.username);

    res.created("Signup successful", { userToken });
  } catch (err) {
    console.log(err);

    res.serverError();
  }
});

router.get("/logout", loggedIn, async (req, res) => {
  try {
    const userToken = req.userToken;
    client.del(userToken);

    res.ok("Successfully logged out");
  } catch (err) {
    console.log(err);

    res.serverError();
  }
});

export const LoginRouter = router;
