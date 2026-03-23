import express from "express";
import routes from "./routes";
import "dotenv/config";
import { errorMiddleware } from "./middlewares/error.middleware";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "http://localhost:4000",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.get("/teste", (req, res) => {
  res.json({ mensagem: "ok" });
});

app.use(routes);

app.use(errorMiddleware);

export default app;