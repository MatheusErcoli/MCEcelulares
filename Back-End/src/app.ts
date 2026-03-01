import express, { Request, Response, Router } from "express";
import MarcaController from "./controllers/marca.controllers";
import CategoriaController from "./controllers/categoria.controllers";

const app = express();
app.use(express.json());

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo!");
});

router.get("/marca", MarcaController.findAll);
router.post("/marca", MarcaController.create);
router.get("/marca/:id", MarcaController.getById);

router.get("/categoria", CategoriaController.findAll);
router.post("/categoria", CategoriaController.create);
router.get("/categoria/:id", CategoriaController.getById);

app.use(router);

export default app;