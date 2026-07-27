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
    const [usuario] = await conexionMySQL.query(
      "SELECT * FROM lefonde.usuarios WHERE usuario LIKE ? AND contrasena LIKE ?",
      [user, pass],
    );

    if (usuario.length === 0) {
      res.send({ mensaje: "Usuario o contraseña incorrectos" });
    } else {
      const token = jwt.sign({ usuario }, "Stack", { expiresIn: "1d" });
      res.send({ token });
      console.log(usuario);
    }
  } catch (error) {
    res.send({ mensaje: "Usuario no encontrado" });
  }
};

router.post("/login", login);

export default router;
