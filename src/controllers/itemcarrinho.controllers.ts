import { Request, Response } from "express";
import ItemCarrinho from "../models/ItemCarrinho";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../validators/itemCarrinhoValidator";

class ItemCarrinhoController {
  static async findAll(req: Request, res: Response) {
    try {
      const itensCarrinho = await ItemCarrinho.findAll({
        include: ["carrinho", "produto"],
      });

      return res.status(200).json(itensCarrinho);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar itens do carrinho" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id), {
        include: ["carrinho", "produto"],
      });

      if (!itemCarrinho) {
        return res
          .status(404)
          .json({ message: "Item do carrinho não encontrado" });
      }

      return res.status(200).json(itemCarrinho);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar item do carrinho" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createItemCarrinhoSchema.parse(req.body);

      const { id_carrinho, id_produto, preco_unitario, quantidade } = data;

      const novoItemCarrinho = await ItemCarrinho.create({
        id_carrinho,
        id_produto,
        preco_unitario,
        quantidade,
      });

      return res.status(201).json(novoItemCarrinho);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao criar item do carrinho",
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateItemCarrinhoSchema.parse(req.body);

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) {
        return res
          .status(404)
          .json({ message: "Item do carrinho não encontrado" });
      }

      await itemCarrinho.update(dados);

      return res.status(200).json(itemCarrinho);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar item do carrinho",
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itemCarrinho = await ItemCarrinho.findByPk(Number(id));

      if (!itemCarrinho) {
        return res
          .status(404)
          .json({ message: "Item do carrinho não encontrado" });
      }

      await itemCarrinho.destroy();

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar item do carrinho" });
    }
  }
}

export default ItemCarrinhoController;
