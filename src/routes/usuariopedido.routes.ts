import { Router } from "express";
import UsuarioPedidoController from "../controllers/usuariopedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createUsuarioPedidoSchema,
  updateUsuarioPedidoSchema,
} from "../validators/usuarioPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, UsuarioPedidoController.findAll);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createUsuarioPedidoSchema),
  UsuarioPedidoController.create,
);

router.get("/:id", authMiddleware, UsuarioPedidoController.findById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateUsuarioPedidoSchema),
  UsuarioPedidoController.update,
);

router.delete("/:id", authMiddleware, adminMiddleware, UsuarioPedidoController.delete);

export default router;
