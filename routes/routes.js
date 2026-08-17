import { Router } from "express";
import login_route from "./login.js";
import mesas_route from "./mesas.js";
import produ_route from "./productos.js";
import orden_route from "./orden.js";

const router = Router();

router.use(login_route);
router.use(mesas_route);
router.use(produ_route);
router.use(orden_route);

export default router;
