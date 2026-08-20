import { Router } from "express";
import login from "./login.js";
import mesas from "./mesas.js";
import productos from "./productos.js";
import ordenes from "./ordenes.js";
import nuevaorden from "./nuevaorden.js";   
import orden from "./orden.js";
import servir from "./servir.js";

const router = Router();

router.use(login);
router.use(ordenes);
router.use(nuevaorden);
router.use(orden);
router.use(servir);
router.use(mesas);
router.use(productos);

export default router;
