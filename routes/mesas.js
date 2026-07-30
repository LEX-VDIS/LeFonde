import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const mesas = async (req, res) => {
  const { disponible } = req.body;
  try {
    const [mesas] = await conexionMySQL.query(
      "SELECT * FROM lefonde.mesas WHERE disponible = ?",
      [disponible],
    );

    if (mesas.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ mesas });
      console.log(mesas);
    }
  } catch (error) {
    res.send(error);
  }
};

router.post("/mesas", mesas);

export default router;
