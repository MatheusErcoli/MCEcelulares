import { Router } from "express";
import ItemCarrinhoController from "../controllers/itemcarrinho.controllers";
import { validate } from "../middlewares/validate.middleware";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../validators/itemCarrinhoValidator";

const router = Router();

router.get("/", ItemCarrinhoController.findAll);

router.post("/", validate(createItemCarrinhoSchema), ItemCarrinhoController.create,);

router.get("/:id", ItemCarrinhoController.findById);

router.put("/:id", validate(updateItemCarrinhoSchema), ItemCarrinhoController.update,);

router.delete("/:id", ItemCarrinhoController.delete);

export default router;
