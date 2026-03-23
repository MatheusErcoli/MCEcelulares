import { Router } from "express";
import ItemPedidoController from "../controllers/itempedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema
} from "../validators/itemPedido.validator";

const router = Router();

router.get("/", ItemPedidoController.findAll);

router.post("/", validate(createItemPedidoSchema), ItemPedidoController.create);

router.get("/:id", ItemPedidoController.findById);

router.put("/:id", validate(updateItemPedidoSchema),ItemPedidoController.update);

router.delete("/:id", ItemPedidoController.delete);

export default router;