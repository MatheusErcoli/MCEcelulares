import { Router } from "express";
import PagamentoController from "../controllers/pagamento.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPagamentoSchema,
  updatePagamentoSchema,
} from "../validators/pagamento.validator";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, PagamentoController.findAll);

router.post("/", authMiddleware, validate(createPagamentoSchema), PagamentoController.create);

router.get("/:id", authMiddleware, PagamentoController.findById);

router.put("/:id", authMiddleware, adminMiddleware, validate(updatePagamentoSchema), PagamentoController.update);

router.delete("/:id", authMiddleware, adminMiddleware, PagamentoController.delete);

export default router;