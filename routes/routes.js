import { Router } from "express";
import login from "./login.js";
import mesas from "./mesas.js";
import productos from "./productos.js";
import ordenes from "./ordenes.js";
import nuevaorden from "./nuevaorden.js";   
import orden from "./orden.js";
import servir from "./servir.js";
import servicio from "./servicio.js";
import usuarios from "./usuarios.js";   
import administracion from "./administracion.js";

const router = Router();

router.use(login);
router.use(ordenes);
router.use(nuevaorden);
router.use(orden);
router.use(servir);
router.use(servicio);
router.use(mesas);
router.use(productos);
router.use(usuarios);
router.use(administracion);

export default router;
