import express, { Request, Response, Router } from "express";
import MarcaController from "./controllers/marca.controllers";
import CategoriaController from "./controllers/categoria.controllers";
import ProdutoController from "./controllers/produto.controllers";
import UsuarioController from "./controllers/usuario.controllers";
import EnderecoController from "./controllers/endereco.controllers";

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

router.get("/produto", ProdutoController.findAll);
router.post("/produto", ProdutoController.create);
router.get("/produto/:id", ProdutoController.getById);

router.get("/usuario", UsuarioController.findAll);
router.post("/usuario", UsuarioController.create);
router.get("/usuario/:id", UsuarioController.getById);

router.get('/endereco', EnderecoController.findAll);
router.post('/endereco', EnderecoController.create);
router.get('/endereco/:id', EnderecoController.getById);

app.use(router);

export default app;