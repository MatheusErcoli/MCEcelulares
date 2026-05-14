import { Router } from "express";
import EnderecoController from "../controllers/endereco.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createEnderecoSchema,
  updateEnderecoSchema,
} from "../validators/endereco.validator";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, EnderecoController.findAll);

router.post(
  "/",
  authMiddleware,
  validate(createEnderecoSchema),
  EnderecoController.create,
);

router.get("/:id", authMiddleware, EnderecoController.findById);

router.put(
  "/:id",
  authMiddleware,
  validate(updateEnderecoSchema),
  EnderecoController.update,
);

router.delete("/:id", authMiddleware, EnderecoController.delete);

export default router;
