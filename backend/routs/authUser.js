import express from "express";
import { userRegister } from "../routecontrollers/routecontrol.js";
import { userLogin } from "../routecontrollers/routecontrol.js";
import { userLogout } from "../routecontrollers/routecontrol.js";
const authRouter = express.Router();

authRouter.post("/registor", userRegister);

authRouter.post("/login", userLogin);

authRouter.post("/logout", userLogout);

export default authRouter;
