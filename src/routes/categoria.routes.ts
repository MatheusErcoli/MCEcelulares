import { Router } from "express";
import CategoriaController from "../controllers/categoria.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from "../validators/categoriaValidator";

const router = Router();

router.get("/", CategoriaController.findAll);

router.post("/", validate(createCategoriaSchema), CategoriaController.create);

router.get("/:id", CategoriaController.findById);

router.put("/:id", validate(updateCategoriaSchema), CategoriaController.update);

router.delete("/:id", CategoriaController.delete);

export default router;
