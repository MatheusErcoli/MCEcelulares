import { Router } from "express";
import ItemPedidoController from "../controllers/itempedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../validators/itemPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", ItemPedidoController.findAll);

router.post("/", validate(createItemPedidoSchema), ItemPedidoController.create);

router.get("/:id", authMiddleware, ItemPedidoController.findById);

router.put("/:id", validate(updateItemPedidoSchema), ItemPedidoController.update);

router.delete("/:id", ItemPedidoController.delete);

export default router;
