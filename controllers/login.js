import getData from "../utils/request.js";
import User from "../models/user.js";
import auth, { SID } from "../middlewares/auth.js";
import bcryptjs from "bcryptjs";

const login = async (req, res) => {
  const [username, password] = getData(req.body, ["username", "password"]);

  if ([username, password].includes(null)) return res.noParams();

  try {
    const user = await User.findOne({ username });
    if (user === null) return res.bad("Invalid Username");

    if (!bcryptjs.compareSync(password, user.password))
      return res.unauth("Invalid Password");

    await setSessionId(username, user.id, res);
  } catch (err) {
    console.log(err);

    res.serverError();
  }
};

const signup = async (req, res) => {
  const [username, password] = getData(req.body, ["username", "password"]);

  if ([username, password].includes(null)) return res.noParams();

  try {
    const userAvailable = await User.findOne({ username });
    if (userAvailable !== null) return res.conflict("Username not available");

    const user = await User.create({ username, password });

    await setSessionId(username, user.id, res);
  } catch (err) {
    console.log(err);

    res.serverError();
  }
};

const setSessionId = async (username, userId, res) => {
  const sessionId = await auth.setup(username, userId);

  res.cookie(SID, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.created("User Logged in succesfully", { sessionId });
};

export const LoginHandler = { login, signup };
