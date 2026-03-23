import { Router } from "express";
import PedidoController from "../controllers/pedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../validators/pedido.validator";

const router = Router();

router.get("/", PedidoController.findAll);

router.post("/", validate(createPedidoSchema), PedidoController.create);

router.get("/:id", PedidoController.findById);

router.put("/:id", validate(updatePedidoSchema), PedidoController.update);

router.delete("/:id", PedidoController.delete);

export default router;
