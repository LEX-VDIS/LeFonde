import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import lefonde_routes from "./routes/routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");
  socket.on("mensaje", (data) => {
    console.log("Mensaje:", data);   
    socket.broadcast.emit("mensaje", data);
  });
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors({ origin: ["http://localhost:4444"], methods: ["GET", "POST"] }));
app.use(cors());
app.use(morgan("dev"));
app.use(lefonde_routes);
app.use("/", express.static("/inicio"));

app.set("appName", "LeFonde");
app.set("port", 55555);
app.set("views", __dirname);
app.set("view engine", "ejs");

server.listen(app.get("port"));

console.log("Ruta > " + __dirname);
console.log("LeFonde API (v0.1.1)");
console.log(
  `Servidor ${app.get("appName")} en el puerto ${app.get("port")}`,
);
