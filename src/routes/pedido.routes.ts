import { Router } from "express";
import PedidoController from "../controllers/pedido.controllers";

const router = Router();

router.get("/", PedidoController.findAll);
router.post("/", PedidoController.create);
router.get("/:id", PedidoController.findById);
router.put("/:id", PedidoController.update);
router.delete("/:id", PedidoController.delete);

export default router;