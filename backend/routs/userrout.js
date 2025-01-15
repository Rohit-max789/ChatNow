import express from "express";
import islogin from "../middleware/islogin.js";
import { getuser } from "../routecontrollers/userroutcon.js";
import { getcurrchater } from "../routecontrollers/userroutcon.js";

import { getUserProfile } from "../routecontrollers/userroutcon.js";

const router = express.Router();

router.get("/search", islogin, getuser);
router.get("/currchater", islogin, getcurrchater);
router.get("/profile", islogin, getUserProfile);

export default router;
