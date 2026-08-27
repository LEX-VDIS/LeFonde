import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const administracion = async (req, res) => {
  try {
    const [conteos] = await conexionMySQL.query(
      "SELECT COUNT(*) AS TOTAL FROM lefonde.ordenes WHERE ordenes.finalizado = 1; SELECT SUM(total) FROM lefonde.ordenes WHERE ordenes.finalizado = 1; SELECT * FROM lefonde.usuarios WHERE administrador = 1; SELECT * FROM lefonde.usuarios WHERE administrador = 0;",
    );

    if (conteos.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ conteos });
      console.log({ conteos });
    }
  } catch (error) {
    res.send(error);
  }
};

router.get("/administracion", administracion);

export default router;
