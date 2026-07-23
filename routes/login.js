import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

let LeUser = "";
let LePass = "";

const getPass = async (req, res) => {
  LeUser = req.query.user;
  try {
    const [results] = await conexionMySQL.query(
      "SELECT contrasena FROM lefonde.usuarios WHERE usuario LIKE ?",
      [LeUser],
    );
    LePass = results[0].contrasena;
  } catch (error) {
    console.log(error);
  }
  await res.json(LePass);
  await conexionMySQL.end();
};

router.get("/login", getPass);

export default router;
