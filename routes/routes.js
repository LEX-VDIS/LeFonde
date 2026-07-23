import { Router } from "express";
import login_route from "./login.js";

const router = Router();

router.use(login_route);

export default router;
