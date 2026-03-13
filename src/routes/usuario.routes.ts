import { Router } from "express";
import UsuarioController from "../controllers/usuario.controllers";
import { validate } from "../middlewares/validate.middleware";
import { createUsuarioSchema, updateUsuarioSchema } from "../validators/usuarioValidator";

const router = Router();

router.get("/", UsuarioController.findAll);

router.post(
  "/",
  validate(createUsuarioSchema),
  UsuarioController.create
);

router.get("/:id", UsuarioController.findById);

router.put(
  "/:id",
  validate(updateUsuarioSchema),
  UsuarioController.update
);

router.delete("/:id", UsuarioController.delete);

export default router;