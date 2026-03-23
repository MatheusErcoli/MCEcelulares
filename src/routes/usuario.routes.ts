import { Router } from "express";
import UsuarioController from "../controllers/usuario.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import { createUsuarioSchema } from "../validators/usuario.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post("/", validate(createUsuarioSchema), UsuarioController.create);

router.get("/", authMiddleware, UsuarioController.findAll);
router.get("/:id", authMiddleware, UsuarioController.findById);
router.put("/:id", authMiddleware, UsuarioController.update);
router.delete("/:id", authMiddleware, UsuarioController.delete);

export default router;
