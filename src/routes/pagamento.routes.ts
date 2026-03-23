import { Router } from "express";
import PagamentoController from "../controllers/pagamento.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createPagamentoSchema,
  updatePagamentoSchema,
} from "../validators/pagamento.validator";

const router = Router();

router.get("/", PagamentoController.findAll);

router.post("/", validate(createPagamentoSchema), PagamentoController.create);

router.get("/:id", PagamentoController.findById);

router.put("/:id", validate(updatePagamentoSchema), PagamentoController.update);

router.delete("/:id", PagamentoController.delete);

export default router;
