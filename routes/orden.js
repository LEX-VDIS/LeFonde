import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

export default router;

const nuevaOrden = async (req, res) => {
  console.log(req.body.productos);
  const { servicio, mesa } = req.body.data;
  try {
    const [ordenes] = await conexionMySQL.query(
      "INSERT INTO `lefonde`.`ordenes` (`servicio`, `idmesa`, `idusuario`) VALUES (?, ?, ?);",
      [servicio, mesa, 1],
    );
    if (ordenes.affectedRows === 0) {
      res.send({ mensaje: "no se pudo crear la orden" });
    } else {
      res.send({ ordenes });
      console.log({ ordenes });
      const [ultimaorden] = await conexionMySQL.query("SELECT * FROM lefonde.ordenes WHERE idorden = ?;", [ordenes.insertId]);
      console.log(ultimaorden[0].idorden);
      req.body.productos.forEach(async (producto) => {
        const [detalle] = await conexionMySQL.query(
          "INSERT INTO `lefonde`.`detalle` (`idorden`, `idproducto`, `cantidad`, `precio`, `subtotal`) VALUES (?, ?, ?, ?, ?);",
          [ultimaorden[0].idorden, producto.id, producto.quantity, producto.precio, producto.quantity * producto.precio],
        );
        console.log(detalle);
      });
    }
  } catch (error) {
    res.send(error);
  }
};

router.post("/orden", nuevaOrden);
