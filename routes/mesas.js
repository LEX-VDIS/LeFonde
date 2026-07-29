import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const mesas = async (req, res) => {
  try {
    const [cant_mesas] = await conexionMySQL.query(
      "SELECT COUNT(*) FROM lefonde.mesa",
    );

    if (cant_mesas.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ cant_mesas });
      console.log(cant_mesas);
    }

  } catch (error) {
    res.send({ mensaje: "Usuario no encontrado" });
  }
};

router.post("/mesas", mesas);

export default router;
