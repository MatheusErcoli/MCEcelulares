import { Router } from "express";
import PedidoController from "../controllers/pedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../validators/pedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.get("/", authMiddleware, PedidoController.findAll);

router.post("/", authMiddleware, validate(createPedidoSchema), PedidoController.create);

router.get("/:id", authMiddleware, PedidoController.findById);

router.put("/:id", authMiddleware, adminMiddleware, validate(updatePedidoSchema), PedidoController.update);

router.delete("/:id", authMiddleware, adminMiddleware, PedidoController.delete);

export default router;