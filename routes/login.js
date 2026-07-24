import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";
import jwt from "jsonwebtoken";

const router = Router();

let LeUser = "";
let LePass = "";
let LeData = "";

const login = async (req, res) => {
  const { user, pass } = req.body;

  try {
    const [results] = await conexionMySQL.query(
      "SELECT * FROM lefonde.usuarios WHERE usuario LIKE ? AND contrasena LIKE ?",
      [user, pass],
    );

    if (results.length === 0) {
      res.send({ mensaje: "Usuario o contraseña incorrectos" });
    } else {
      const token = jwt.sign({ user }, "Stack", { expiresIn: "1m" });
      res.send({ token });
      console.log(results);
    }
  } catch (error) {
    res.send({ mensaje: "usuario no encontrado" });
  }
};

router.post("/login", login);

export default router;
