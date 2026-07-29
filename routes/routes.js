import { Router } from "express";
import login_route from "./login.js";
import mesas_route from "./mesas.js";

const router = Router();

router.use(login_route);
router.use(mesas_route);

export default router;
