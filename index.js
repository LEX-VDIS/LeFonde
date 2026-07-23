import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import lefonde_routes from "./routes/routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.set("appName", "LeFonde");
app.set("port", 8888);
app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(lefonde_routes);
app.use("/", express.static("/inicio"));
app.listen(app.get("port"));

console.log("Ruta > " + __dirname);
console.log("LeFonde API (v0.1.1)");
console.log(`Servidor ${app.get("appName")} en el puerto ${app.get("port")}`);
