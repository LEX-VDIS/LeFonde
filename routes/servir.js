import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

export default router;

const servir = async (req, res) => {
  const { producto } = req.body;
  try {
    const [orden] = await conexionMySQL.query(
      "UPDATE `lefonde`.`detalle` SET `servido` = '1' WHERE (`iddetalle` = ?);",
      [producto],
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

const borrar = async (req, res) => {
  const { producto } = req.body;
  try {
    const [orden] = await conexionMySQL.query(
      "DELETE FROM `lefonde`.`detalle` WHERE (`iddetalle` = ?);",
      [producto],
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

router.put("/servir", servir);
router.delete("/servir", borrar);
