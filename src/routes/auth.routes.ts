import { Router } from "express";
import AuthController from "../controllers/auth.controllers";
import { loginUsuarioSchema } from "../validators/usuario.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post("/login", validate(loginUsuarioSchema), AuthController.login);

export default router;