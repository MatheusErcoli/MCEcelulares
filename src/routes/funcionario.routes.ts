import { Router } from "express";
import FuncionarioController from "../controllers/funcionario.controllers";

const router = Router();

router.get("/", FuncionarioController.findAll);
router.post("/", FuncionarioController.create);
router.get("/:id", FuncionarioController.findById);
router.put("/:id", FuncionarioController.update);
router.delete("/:id", FuncionarioController.delete);

export default router;