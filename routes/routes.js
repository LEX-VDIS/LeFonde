import { Router } from "express";
import login from "./login.js";
import mesas from "./mesas.js";
import productos from "./productos.js";
import orden from "./orden.js";
import ordenes from "./ordenes.js";

const router = Router();

router.use(login);
router.use(mesas);
router.use(productos);
router.use(orden);
router.use(ordenes);

export default router;
