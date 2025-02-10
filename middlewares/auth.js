import jwt from "jsonwebtoken";
import _env from "../constants/env.js";
import { client } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";
import { statusCode as c } from "../utils/status_codes.js";

export const SID = "sessionId";

/**
 * gives a session Id that can be setup in the cookies of user
 * @param {String} username
 * @param {String} userId mongodb _id of user
 * @returns {String} session Id
 */
const setupAuth = async (username, userId) => {
  const user = { id: userId, username };
  const jwtToken = jwt.sign(user, _env.jwt.SECRET); // create a user jwt token

  const sessionId = `${username}:${uuidv4()}`; // create a session Id

  // set session Id with the jwt token in cache
  await client.setEx(sessionId, 5 * 24 * 60 * 60, jwtToken);

  return sessionId;
};

/**
 * Gets the user data from the session Id
 * @param {String} sessionId
 * @returns {Object | null} user data
 *
 */
const getUserFromSession = async (sessionId) => {
  const jwtToken = await client.get(sessionId);

  if (strToken === null) return null;

  try {
    const user = jwt.verify(jwtToken, _env.jwt.SECRET); // get user
    return user;
  } catch (err) {
    console.log(err);
  }

  return null; // else null
};

/**
 * Verifies if the session Id is valid
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const verifyAuth = async (req, res, next) => {
  const sessionId =
    req.cookies?.[SID] ?? req.headers?.authorization?.split(" ")[1] ?? null; // get session Id

  const user = await getUserFromSession(sessionId);

  if (user === null)
    res.status(c.UNAUTHORIZED).json({ message: "No session Id like that" });
  else {
    req.user = user; // set user

    next(); // to the next handler
  }
};

const auth = { setup: setupAuth, verify: verifyAuth };

export default auth;
