import { LogoutRouter } from "./logout.js";
import { LoginRouter } from "./login.js";

const _routes = {
  login: LoginRouter,
  logout: LogoutRouter
};

export default _routes;
