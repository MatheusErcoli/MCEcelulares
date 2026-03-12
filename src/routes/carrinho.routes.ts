import { Router } from "express";
import CarrinhoController from "../controllers/carrinho.controllers";

const router = Router();

router.get("/", CarrinhoController.findAll);
router.post("/", CarrinhoController.create);
router.get("/:id", CarrinhoController.findById);
router.put("/:id", CarrinhoController.update);
router.delete("/:id", CarrinhoController.delete);

export default router;