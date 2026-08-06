import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

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

router.post("/productos", productos);

export default router;
