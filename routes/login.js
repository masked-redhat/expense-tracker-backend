import { Router } from "express";
import _handler from "../controllers/handler.js";

const h = _handler.login;

const router = Router();

router.post("/", h.login);

router.post("/new", h.signup);

export const LoginRouter = router;
