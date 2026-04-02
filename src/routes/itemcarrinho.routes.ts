import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../validators/itemCarrinho.validator";
import authMiddleware from "../middlewares/auth.middleware";
import ItemCarrinhoController from "../controllers/itemCarrinho.controllers";

const router = Router();

router.get("/", authMiddleware, ItemCarrinhoController.findAll);

router.post(
  "/",
  authMiddleware,
  validate(createItemCarrinhoSchema),
  ItemCarrinhoController.create,
);

router.get(
  "/carrinho/:id_carrinho",
  authMiddleware,
  ItemCarrinhoController.findByCartId,
);

router.get("/:id", authMiddleware, ItemCarrinhoController.findById);

router.put(
  "/:id",
  authMiddleware,
  validate(updateItemCarrinhoSchema),
  ItemCarrinhoController.update,
);

router.delete("/:id", authMiddleware, ItemCarrinhoController.delete);

export default router;
