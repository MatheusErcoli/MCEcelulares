import { Router } from "express";
import ProdutoController from "../controllers/produto.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../validators/produto.validator";

const router = Router();

router.get("/", ProdutoController.findAll);

router.post("/", validate(createProdutoSchema), ProdutoController.create);

router.get("/:id", ProdutoController.findById);

router.put("/:id", validate(updateProdutoSchema), ProdutoController.update);

router.delete("/:id", ProdutoController.delete);

export default router;
