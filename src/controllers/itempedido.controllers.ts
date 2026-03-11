import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Produto from "../models/Produto";
import ItemPedido from "../models/ItemPedido";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../validators/itemPedidoValidator";

class ItemPedidoController {
  static async findAll(req: Request, res: Response) {
    try {
      const itensPedido = await ItemPedido.findAll({
        include: [
          { model: Pedido, as: "pedido" },
          { model: Produto, as: "produto" },
        ],
      });

      return res.status(200).json(itensPedido);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar itens do pedido" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itemPedido = await ItemPedido.findByPk(Number(id), {
        include: [
          { model: Pedido, as: "pedido" },
          { model: Produto, as: "produto" },
        ],
      });

      if (!itemPedido) {
        return res
          .status(404)
          .json({ message: "Item do pedido não encontrado" });
      }

      return res.status(200).json(itemPedido);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar item do pedido" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createItemPedidoSchema.parse(req.body);

      const { id_pedido, id_produto, quantidade, preco_unitario } = data;

      const itemPedido = await ItemPedido.create({
        id_pedido,
        id_produto,
        quantidade,
        preco_unitario,
      });

      return res.status(201).json(itemPedido);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({ message: "Erro ao criar item do pedido" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateItemPedidoSchema.parse(req.body);

      const itemPedido = await ItemPedido.findByPk(Number(id));

      if (!itemPedido) {
        return res
          .status(404)
          .json({ message: "Item do pedido não encontrado" });
      }

      await itemPedido.update(dados);

      return res.status(200).json(itemPedido);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res
        .status(500)
        .json({ message: "Erro ao atualizar item do pedido" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const itemPedido = await ItemPedido.findByPk(Number(id));

      if (!itemPedido) {
        return res
          .status(404)
          .json({ message: "Item do pedido não encontrado" });
      }

      await itemPedido.destroy();

      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar item do pedido" });
    }
  }
}

export default ItemPedidoController;
