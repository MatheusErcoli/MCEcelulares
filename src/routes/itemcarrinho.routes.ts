import { Router } from "express";
import ItemCarrinhoController from "../controllers/itemcarrinho.controllers";

const router = Router();

router.get("/", ItemCarrinhoController.findAll);
router.post("/", ItemCarrinhoController.create);
router.get("/:id", ItemCarrinhoController.findById);
router.put("/:id", ItemCarrinhoController.update);
router.delete("/:id", ItemCarrinhoController.delete);

export default router;