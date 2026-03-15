import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Produto from "../models/Produto";
import ItemPedido from "../models/ItemPedido";

class ItemPedidoController {
  static async findAll(req: Request, res: Response) {
    const itensPedido = await ItemPedido.findAll({
      include: [
        { model: Pedido, as: "pedido" },
        { model: Produto, as: "produto" },
      ],
    });

    return res.status(200).json(itensPedido);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const itemPedido = await ItemPedido.findByPk(Number(id), {
      include: [
        { model: Pedido, as: "pedido" },
        { model: Produto, as: "produto" },
      ],
    });

    if (!itemPedido) {
      return res.status(404).json({
        message: "Item do pedido não encontrado",
      });
    }

    return res.status(200).json(itemPedido);
  }

  static async create(req: Request, res: Response) {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;

    const itemPedido = await ItemPedido.create({
      id_pedido,
      id_produto,
      quantidade,
      preco_unitario,
    });

    return res.status(201).json(itemPedido);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const itemPedido = await ItemPedido.findByPk(Number(id));

    if (!itemPedido) {
      return res.status(404).json({
        message: "Item do pedido não encontrado",
      });
    }

    const dados = req.body;

    await itemPedido.update(dados);

    return res.status(200).json(itemPedido);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const itemPedido = await ItemPedido.findByPk(Number(id));

    if (!itemPedido) {
      return res.status(404).json({
        message: "Item do pedido não encontrado",
      });
    }

    await itemPedido.destroy();

    return res.status(204).send();
  }
}

export default ItemPedidoController;
