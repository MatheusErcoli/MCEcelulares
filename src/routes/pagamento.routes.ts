import { Router } from "express";
import PagamentoController from "../controllers/pagamento.controllers";

const router = Router();

router.get("/", PagamentoController.findAll);
router.post("/", PagamentoController.create);
router.get("/:id", PagamentoController.findById);
router.put("/:id", PagamentoController.update);
router.delete("/:id", PagamentoController.delete);

export default router;