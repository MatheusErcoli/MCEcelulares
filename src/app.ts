import express from "express";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

app.use(routes);

app.use(errorMiddleware);

export default app;