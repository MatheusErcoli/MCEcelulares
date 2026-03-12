import { Router } from "express";
import UsuarioController from "../controllers/usuario.controllers";

const router = Router();

router.get("/", UsuarioController.findAll);
router.post("/", UsuarioController.create);
router.get("/:id", UsuarioController.findById);
router.put("/:id", UsuarioController.update);
router.delete("/:id", UsuarioController.delete);

export default router;