import { Router } from "express";
import MarcaController from "../controllers/marca.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createMarcaSchema,
  updateMarcaSchema,
} from "../validators/marca.validator";

const router = Router();

router.get("/", MarcaController.findAll);

router.post("/", validate(createMarcaSchema), MarcaController.create);

router.get("/:id", MarcaController.findById);

router.put("/:id", validate(updateMarcaSchema), MarcaController.update);

router.delete("/:id", MarcaController.delete);

export default router;
