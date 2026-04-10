import { NextFunction, Request, Response } from "express";
import ItemPedido from "../models/ItemPedido";
import { HttpError } from "../types/http_error";
import { findByIdOuErroItemPedido } from "../utils/FindByIdOuErro/findByIdOuErroItemPedido";

class ItemPedidoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const itensPedido = await ItemPedido.findAll({
        include: ["pedido","produto"],
      });

      return res.status(200).json(itensPedido);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const itemPedido = await findByIdOuErroItemPedido(Number(id), {
        include: ["pedido", "produto"],
      });

      return res.status(200).json(itemPedido);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;

    const itemPedido = await ItemPedido.create({
      id_pedido,
      id_produto,
      quantidade,
      preco_unitario,
    });

    return res.status(201).json(itemPedido);
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const itemPedido = await findByIdOuErroItemPedido(Number(id));

    const dados = req.body;

    await itemPedido.update(dados);

    return res.status(200).json(itemPedido);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const itemPedido = await findByIdOuErroItemPedido(Number(id));

    await itemPedido.destroy();

    return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default ItemPedidoController;
