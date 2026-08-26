import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

export default router;

const orden = async (req, res) => {
  const { idorden } = req.body;
  try {
    const [orden] = await conexionMySQL.query(
      "SELECT * FROM `lefonde`.`ordenes` WHERE `idorden` = ?; SELECT * FROM `lefonde`.`detalle` WHERE `idorden` = ? AND `cantidad` > 0; SELECT * FROM `lefonde`.`detalle` WHERE `idorden` = ? AND `servido` > 0; ",
      [idorden, idorden, idorden],
    );
    if (orden.length === 0) {
      res.send({ mensaje: "no se encontro la orden" });
    } else {
      res.send({ orden });
      console.log({ orden });
    }
  } catch (error) {
    res.send(error);
  }
};

router.post("/orden", orden);
