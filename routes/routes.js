import { Router } from "express";
import login_route from "./login.js";
import mesas_route from "./mesas.js";
import produ_route from "./productos.js";

const router = Router();

router.use(login_route);
router.use(mesas_route);
router.use(produ_route);

export default router;
