import { Router } from "express";
import CategoriaController from "../controllers/categoria.controllers";

const router = Router();

router.get("/", CategoriaController.findAll);
router.post("/", CategoriaController.create);
router.get("/:id", CategoriaController.findById);
router.put("/:id", CategoriaController.update);
router.delete("/:id", CategoriaController.delete);

export default router;