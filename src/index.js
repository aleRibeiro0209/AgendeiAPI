import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";
import config from './core/config.js';

const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.listen(config.port, () => {
  console.log(`Servidor rodando na porta: ${config.port}`);
});