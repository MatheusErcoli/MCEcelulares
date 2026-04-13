import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../validators/itemPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import ItemPedidoController from "../controllers/itempedido.controllers";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, ItemPedidoController.findAll);

router.post("/", authMiddleware, adminMiddleware, validate(createItemPedidoSchema), ItemPedidoController.create);

router.get("/:id", authMiddleware, ItemPedidoController.findById);

router.put("/:id", authMiddleware, adminMiddleware, validate(updateItemPedidoSchema), ItemPedidoController.update);

router.delete("/:id", authMiddleware, adminMiddleware, ItemPedidoController.delete);

export default router;