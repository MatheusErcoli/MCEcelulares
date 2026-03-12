import { Router } from "express";
import MarcaController from "../controllers/marca.controllers";

const router = Router();

router.get("/", MarcaController.findAll);
router.post("/", MarcaController.create);
router.get("/:id", MarcaController.findById);
router.put("/:id", MarcaController.update);
router.delete("/:id", MarcaController.delete);

export default router;