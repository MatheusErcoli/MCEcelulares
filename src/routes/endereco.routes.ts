import { Router } from "express";
import EnderecoController from "../controllers/endereco.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createEnderecoSchema,
  updateEnderecoSchema,
} from "../validators/endereco.validator";

const router = Router();

router.get("/", EnderecoController.findAll);

router.post("/", validate(createEnderecoSchema), EnderecoController.create);

router.get("/:id", EnderecoController.findById);

router.put("/:id", validate(updateEnderecoSchema), EnderecoController.update);

router.delete("/:id", EnderecoController.delete);

export default router;
