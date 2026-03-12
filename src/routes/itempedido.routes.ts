import { Router } from "express";
import ItemPedidoController from "../controllers/itempedido.controllers";

const router = Router();

router.get("/", ItemPedidoController.findAll);
router.post("/", ItemPedidoController.create);
router.get("/:id", ItemPedidoController.findById);
router.put("/:id", ItemPedidoController.update);
router.delete("/:id", ItemPedidoController.delete);

export default router;