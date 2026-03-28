import { Router } from "express";
import MarcaController from "../controllers/marca.controllers";
import { validate } from "../middlewares/validate.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
  createMarcaSchema,
  updateMarcaSchema,
} from "../validators/marca.validator";

const router = Router();

router.get("/", MarcaController.findAll);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(createMarcaSchema),
  MarcaController.create,
);

router.get("/:id", MarcaController.findById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(updateMarcaSchema),
  MarcaController.update,
);

router.delete("/:id", authMiddleware, adminMiddleware, MarcaController.delete);

export default router;
