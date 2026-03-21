import { Router } from "express";
import CarrinhoController from "../controllers/carrinho.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createCarrinhoSchema,
  updateCarrinhoSchema,
} from "../validators/carrinhoValidator";

const router = Router();

router.get("/", CarrinhoController.findAll);

router.post("/", validate(createCarrinhoSchema), CarrinhoController.create);

router.get("/:id", CarrinhoController.findById);

router.get("/usuario/:id_usuario", CarrinhoController.findActiveByUser);

router.put("/:id", validate(updateCarrinhoSchema), CarrinhoController.update);

router.delete("/:id", CarrinhoController.delete);

export default router;
