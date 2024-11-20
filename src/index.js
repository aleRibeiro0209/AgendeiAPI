import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(3001, () => {
  console.log("Servidor rodando na porta: 3001");
});