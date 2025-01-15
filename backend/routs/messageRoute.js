import express from "express";
import { sendMessage } from "../routecontrollers/messageroute.js";
import { getMessage } from "../routecontrollers/messageroute.js";
import islogin from "../middleware/islogin.js";

const router = express.Router();

router.post("/send/:id", islogin, sendMessage);

router.get("/:id", islogin, getMessage);

export default router;
