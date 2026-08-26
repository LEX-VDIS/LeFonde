import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

export default router;

const servir = async (req, res) => {
  const { producto, accion } = req.body;
  try {
    const [productoSeleccionado] = await conexionMySQL.query(
      "SELECT idorden, cantidad, servido FROM `lefonde`.`detalle` WHERE (`iddetalle` = ?);",
      [producto],
    );
    if (productoSeleccionado.length === 0) {
      res.send({ mensaje: "no se encontro la orden" });
      return;
    } else {
      res.send({ productoSeleccionado });
    }

    const [orden] = await conexionMySQL.query(
      accion === 1
        ? "UPDATE `lefonde`.`detalle` SET  `cantidad` = `cantidad` - 1, `servido` =  `servido` + 1  WHERE (`iddetalle` = ?); UPDATE `lefonde`.`ordenes` SET  `prod_servidos` = `prod_servidos` + 1 WHERE (`idorden` = ?);"
        : "UPDATE `lefonde`.`detalle` SET  `cantidad` = `cantidad` + 1, `servido` =  `servido` - 1  WHERE (`iddetalle` = ?); UPDATE `lefonde`.`ordenes` SET  `prod_servidos` = `prod_servidos` - 1 WHERE (`idorden` = ?);",
      [producto, productoSeleccionado[0].idorden],
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
    const [productoSeleccionado] = await conexionMySQL.query(
      "SELECT idorden, cantidad FROM `lefonde`.`detalle` WHERE (`iddetalle` = ?);",
      [producto],
    );
    if (productoSeleccionado.length === 0) {
      res.send({ mensaje: "no se encontro la orden" });
      return;
    } else {
      if (productoSeleccionado[0].cantidad === 0) {
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
        return;
      } else {
        const [orden] = await conexionMySQL.query(
          "UPDATE `lefonde`.`detalle` SET  `cantidad` = `cantidad` - 1 WHERE (`iddetalle` = ?); UPDATE `lefonde`.`ordenes` SET  `prod_totales` = `prod_totales` - 1 WHERE (`idorden` = ?);",
          [producto, productoSeleccionado[0].idorden],
        );
        if (orden.length === 0) {
          res.send({ mensaje: "no se encontro la orden" });
        } else {
          res.send({ orden });
          console.log({ orden });
        }
        return;
      }
    }
  } catch (error) {
    res.send(error);
  }
};

router.put("/servir", servir);
router.delete("/servir", borrar);
