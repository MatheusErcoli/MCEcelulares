import { Router } from "express";
import EnderecoController from "../controllers/endereco.controllers";

const router = Router();

router.get("/", EnderecoController.findAll);
router.post("/", EnderecoController.create);
router.get("/:id", EnderecoController.findById);
router.put("/:id", EnderecoController.update);
router.delete("/:id", EnderecoController.delete);

export default router;