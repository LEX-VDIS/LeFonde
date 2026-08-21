import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const getProductos = async (req, res) => {
  try {
    const [productos] = await conexionMySQL.query(
      "SELECT * FROM lefonde.productos WHERE categoria = 1; SELECT * FROM lefonde.productos WHERE categoria = 2; SELECT * FROM lefonde.productos WHERE categoria = 3; SELECT * FROM lefonde.productos WHERE categoria = 4",
    );

    if (productos.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ productos });
      console.log({ productos });
    }
  } catch (error) {
    res.send(error);
  }
};

const productos = async (req, res) => {
  try {
    const [productos] = await conexionMySQL.query(
      "SELECT * FROM lefonde.productos WHERE categoria = 1; SELECT * FROM lefonde.productos WHERE categoria = 2; SELECT * FROM lefonde.productos WHERE categoria = 3; SELECT * FROM lefonde.productos WHERE categoria = 4",
    );

    if (productos.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ productos });
      console.log({ productos });
    }
  } catch (error) {
    res.send(error);
  }
};

router.get("/productos", getProductos);
router.post("/productos", productos);

export default router;
