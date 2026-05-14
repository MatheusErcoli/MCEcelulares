import { Router } from "express";
import CategoriaController from "../controllers/categoria.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from "../validators/categoria.validator";

const router = Router();

router.get("/", CategoriaController.findAll);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createCategoriaSchema),
  CategoriaController.create,
);

router.get("/:id", CategoriaController.findById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateCategoriaSchema),
  CategoriaController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  CategoriaController.delete,
);

export default router;
