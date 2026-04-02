import { Router } from "express";

import marcaRoutes from "./marca.routes";
import categoriaRoutes from "./categoria.routes";
import produtoRoutes from "./produto.routes";
import usuarioRoutes from "./usuario.routes";
import enderecoRoutes from "./endereco.routes";
import carrinhoRoutes from "./carrinho.routes";
import itemCarrinhoRoutes from "./itemCarrinho.routes";
import pedidoRoutes from "./pedido.routes";
import itemPedidoRoutes from "./itemPedido.routes";
import pagamentoRoutes from "./pagamento.routes";
import funcionarioRoutes from "./funcionario.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/marca", marcaRoutes);
router.use("/categoria", categoriaRoutes);
router.use("/produto", produtoRoutes);
router.use("/usuario", usuarioRoutes);
router.use("/endereco", enderecoRoutes);
router.use("/carrinho", carrinhoRoutes);
router.use("/itemcarrinho", itemCarrinhoRoutes);
router.use("/pedido", pedidoRoutes);
router.use("/itempedido", itemPedidoRoutes);
router.use("/pagamento", pagamentoRoutes);
router.use("/funcionario", funcionarioRoutes);
router.use("/auth", authRoutes);

export default router;