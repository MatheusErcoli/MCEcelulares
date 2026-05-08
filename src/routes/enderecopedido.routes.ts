import { Router } from "express";
import EnderecoPedidoController from "../controllers/endereco_pedido.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
    createEnderecoPedidoSchema,
    updateEnderecoPedidoSchema,
} from "../validators/enderecoPedido.validator";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, EnderecoPedidoController.findAll);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createEnderecoPedidoSchema),
    EnderecoPedidoController.create,
);

router.get("/:id", authMiddleware, EnderecoPedidoController.findById);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateEnderecoPedidoSchema),
    EnderecoPedidoController.update,
);

router.delete("/:id", authMiddleware, adminMiddleware, EnderecoPedidoController.delete);

export default router;