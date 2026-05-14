import { Router } from "express";
import ProdutoController from "../controllers/produto.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../validators/produto.validator";

const router = Router();

router.get("/", ProdutoController.findAll);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createProdutoSchema),
  ProdutoController.create
);

router.get("/:id", ProdutoController.findById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateProdutoSchema),
  ProdutoController.update
);

router.delete("/:id", authMiddleware, adminMiddleware, ProdutoController.delete);

export default router;
