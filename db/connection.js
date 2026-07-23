import mysql from "mysql2/promise";

export const conexionMySQL = await mysql.createConnection({
  host: "localhost",
  user: "LeFonde",
  password: "LeContraseñe",
});
