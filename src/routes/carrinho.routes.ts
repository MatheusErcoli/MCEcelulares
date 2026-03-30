import { Router } from "express";
import CarrinhoController from "../controllers/carrinho.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createCarrinhoSchema,
  updateCarrinhoSchema,
} from "../validators/carrinho.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, CarrinhoController.findAll);

router.post(
  "/",
  authMiddleware,
  validate(createCarrinhoSchema),
  CarrinhoController.create,
);

router.get("/:id", authMiddleware, CarrinhoController.findById);

router.put(
  "/:id",
  authMiddleware,
  validate(updateCarrinhoSchema),
  CarrinhoController.update,
);

router.delete("/:id", authMiddleware, CarrinhoController.delete);

export default router;
