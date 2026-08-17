import {Router} from "express";
import {conexionMySQL} from "../db/connection.js";

const router = Router();

const ordenes = async (req, res) => {
  try {
    const [ordenes] = await conexionMySQL.query(
      "SELECT * FROM lefonde.ordenes WHERE estado = 0; SELECT * FROM lefonde.ordenes WHERE estado = 1; SELECT * FROM lefonde.ordenes WHERE estado = 2",
    );
    if (ordenes.length === 0) {
      res.send({mensaje: "no hay datos"});
    } else {
      res.send({ordenes});
      console.log({ordenes});
    }
  } catch (error) {
    res.send(error);
  }
};

router.get("/ordenes", ordenes);

export default router;

    