import express from "express";
import routes from "./routes";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";

// ... antes das rotas


const app = express();

app.use(cors({
  origin: "http://localhost:4000", // URL do seu Next.js
  credentials: true // Permite envio de cookies/headers se necessário
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.use(routes);

app.use(errorMiddleware);

export default app;