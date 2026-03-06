import express, { Request, Response, Router } from "express";
import MarcaController from "./controllers/marca.controllers";
import CategoriaController from "./controllers/categoria.controllers";
import ProdutoController from "./controllers/produto.controllers";
import UsuarioController from "./controllers/usuario.controllers";
import EnderecoController from "./controllers/endereco.controllers";
import CarrinhoController from "./controllers/carrinho.controllers";
import ItemCarrinhoController from "./controllers/itemcarrinho.controllers";
import PedidoController from "./controllers/pedido.controllers";
import ItemPedidoController from "./controllers/itempedido.controllers";
import PagamentoController from "./controllers/pagamento.controllers";
import FuncionarioController from "./controllers/funcionario.controllers";

const app = express();
app.use(express.json());

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo!");
});

router.get("/marca", MarcaController.findAll);
router.post("/marca", MarcaController.create);
router.get("/marca/:id", MarcaController.findById);

router.get("/categoria", CategoriaController.findAll);
router.post("/categoria", CategoriaController.create);
router.get("/categoria/:id", CategoriaController.findById);

router.get("/produto", ProdutoController.findAll);
router.post("/produto", ProdutoController.create);
router.get("/produto/:id", ProdutoController.findById);

router.get("/usuario", UsuarioController.findAll);
router.post("/usuario", UsuarioController.create);
router.get("/usuario/:id", UsuarioController.findById);

router.get('/endereco', EnderecoController.findAll);
router.post('/endereco', EnderecoController.create);
router.get('/endereco/:id', EnderecoController.findById);

router.get('/carrinho', CarrinhoController.findAll);
router.post('/carrinho', CarrinhoController.create);
router.get('/carrinho/:id', CarrinhoController.findById);

router.get('/itemcarrinho', ItemCarrinhoController.findAll);
router.post('/itemcarrinho', ItemCarrinhoController.create);
router.get('/itemcarrinho/:id', ItemCarrinhoController.findById);

router.get('/pedido', PedidoController.findAll);
router.post('/pedido', PedidoController.create);
router.get('/pedido/:id', PedidoController.findById);

router.get('/itempedido', ItemPedidoController.findAll);
router.post('/itempedido', ItemPedidoController.create);
router.get('/itempedido/:id', ItemPedidoController.findById);

router.get('/pagamento', PagamentoController.findAll);
router.post('/pagamento', PagamentoController.create);
router.get('/pagamento/:id', PagamentoController.findById);

router.get('/funcionario', FuncionarioController.findAll);
router.post('/funcionario', FuncionarioController.create);
router.get('/funcionario/:id', FuncionarioController.findById);

app.use(router);

export default app;