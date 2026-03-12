import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.use(routes);

export default app;