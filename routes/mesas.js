import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const mesas = async (req, res) => {
  try {
    const [mesas] = await conexionMySQL.query(
      "SELECT * FROM lefonde.mesas WHERE disponible = 1 AND idmesa > 0; SELECT * FROM lefonde.mesas WHERE disponible = 0 AND idmesa > 0;",
    );

    if (mesas.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ mesas });
      console.log({ mesas });
    }
  } catch (error) {
    res.send(error);
  }
};

router.post("/mesas", mesas);

const mesasDisponibles = async (req, res) => {
  try {
    const [mesas] = await conexionMySQL.query(
      "SELECT * FROM lefonde.mesas WHERE disponible = 1 AND idmesa > 0;",
    );
    if (mesas.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ mesas });
      console.log({ mesas });
    }
  } catch (error) {
    res.send(error);
  }
};

router.get("/mesas", mesasDisponibles);

export default router;
