import { Router } from "express";
import { conexionMySQL } from "../db/connection.js";

const router = Router();

const usuarios = async (req, res) => {
  try {
    const [personal] = await conexionMySQL.query(
      "SELECT * FROM lefonde.usuarios WHERE administrador = 1; SELECT * FROM lefonde.usuarios WHERE administrador = 0; SELECT * FROM lefonde.usuarios;"
    );

    if (personal.length === 0) {
      res.send({ mensaje: "no hay datos" });
    } else {
      res.send({ personal });
      console.log({ personal });
    }
  } catch (error) {
    res.send(error);
  }
};

router.get("/usuarios", usuarios);

const usuario = async (req, res) => {
  const { idusuario } = req.body;
  try {
    const [usuario] = await conexionMySQL.query(
      "SELECT * FROM lefonde.usuarios WHERE idusuario = ?",
      [idusuario],
    );
    if (usuario.length === 0) {
      res.send({ mensaje: "no se encontro el usuario" });
    } else {
      res.send({ usuario });
      console.log({ usuario });
    }
  } catch (error) {
    res.send(error);
  }
};

router.post("/usuarios", usuario);

export default router;
