import { client } from "../db/connect.js";
import { SID } from "../middlewares/auth.js";

const logout = async (req, res) => {
  try {
    await client.del(req.sessionId);
    res.clearCookie(SID);

    res.deleted();
  } catch (err) {
    console.log(err);

    res.serverError();
  }
};

export const LogoutHandler = { logout };
