let mysql = require('mysql2');

let conexion = mysql.createConnection({
  host: "localhost",
  user: "LeFonde",
  password: "LeContraseñe"
});

conexion.connect(function(err) {
  if (err) throw err;
  console.log("Se ha conectado a la perra puta zorra base de datos MySQL!");
});