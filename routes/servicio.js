import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const servicio = async (req, res) => {
  try {
    const [conteos] = await conexionMySQL.query(
      "SELECT count(*) as total FROM lefonde.ordenes WHERE finalizado = 0 AND prod_servidos < prod_totales; SELECT count(*) as total FROM lefonde.ordenes WHERE finalizado = 0 AND prod_servidos = prod_totales; SELECT count(*) as total FROM lefonde.ordenes WHERE finalizado = 1; SELECT count(*) as total FROM lefonde.mesas WHERE disponible = 1 AND idmesa > 0; SELECT count(*) as total FROM lefonde.mesas WHERE disponible = 0 AND idmesa > 0",
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

router.get("/servicio", servicio);

export default router;
