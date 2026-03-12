import { Router } from "express";
import ProdutoController from "../controllers/produto.controllers";

const router = Router();

router.get("/", ProdutoController.findAll);
router.post("/", ProdutoController.create);
router.get("/:id", ProdutoController.findById);
router.put("/:id", ProdutoController.update);
router.delete("/:id", ProdutoController.delete);

export default router;