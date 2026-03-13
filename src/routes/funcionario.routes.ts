import { Router } from "express";
import FuncionarioController from "../controllers/funcionario.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createFuncionarioSchema,
  updateFuncionarioSchema,
} from "../validators/funcionarioValidator";

const router = Router();

router.get("/", FuncionarioController.findAll);

router.post("/", validate(createFuncionarioSchema), FuncionarioController.create,);

router.get("/:id", FuncionarioController.findById);

router.put("/:id", validate(updateFuncionarioSchema), FuncionarioController.update,);

router.delete("/:id", FuncionarioController.delete);

export default router;
