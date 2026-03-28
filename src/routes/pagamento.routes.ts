import { Router } from "express";
import PagamentoController from "../controllers/pagamento.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPagamentoSchema,
  updatePagamentoSchema,
} from "../validators/pagamento.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, PagamentoController.findAll);

router.post("/", authMiddleware, validate(createPagamentoSchema), PagamentoController.create);

router.get("/:id", PagamentoController.findById);

router.put("/:id", validate(updatePagamentoSchema), PagamentoController.update);

router.delete("/:id", PagamentoController.delete);

export default router;
