import { Router } from "express";
import FuncionarioController from "../controllers/funcionario.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
  createFuncionarioSchema,
  updateFuncionarioSchema,
} from "../validators/funcionario.validator";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, FuncionarioController.findAll);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createFuncionarioSchema),
  FuncionarioController.create,
);

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  FuncionarioController.findById,
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateFuncionarioSchema),
  FuncionarioController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  FuncionarioController.delete,
);

export default router;
