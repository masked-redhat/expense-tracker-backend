import { LoginHandler } from "./login.js";
import { LogoutHandler } from "./logout.js";

const _handler = {
  login: LoginHandler,
  logout: LogoutHandler,
};

export default _handler;
