import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Usuario from "../models/Usuario";
import Funcionario from "../models/Funcionario";
import ItemPedido from "../models/ItemPedido";
import { PaginatedResponse } from "../types/pagination";

class PedidoController {
  static async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    if (page < 1) {
      return res.status(400).json({
        message: "Página inválida",
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Pedido.findAndCountAll({
      where: {
        ativo: true,
      },
      include: [
        { model: Usuario, as: "usuario" },
        { model: Funcionario, as: "funcionario" },
        { model: ItemPedido, as: "itens" },
      ],
      distinct: true,
      col: "id",
      limit,
      offset,
      order: [["id_pedido", "DESC"]],
    });

    const response: PaginatedResponse<(typeof rows)[number]> = {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };

    return res.status(200).json(response);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(Number(id), {
      include: [
        { model: Usuario, as: "usuario" },
        { model: Funcionario, as: "funcionario" },
        { model: ItemPedido, as: "itens" },
      ],
    });

    if (!pedido) {
      return res.status(404).json({
        message: "Pedido não encontrado",
      });
    }

    return res.status(200).json(pedido);
  }

  static async create(req: Request, res: Response) {
    const { id_usuario, id_funcionario, data, valor_total } = req.body;

    const pedido = await Pedido.create({
      id_usuario,
      id_funcionario,
      data,
      valor_total,
      ativo: true,
      status: "CRIADO",
    });

    return res.status(201).json(pedido);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(Number(id));

    if (!pedido) {
      return res.status(404).json({
        message: "Pedido não encontrado",
      });
    }

    const dados = req.body;

    await pedido.update(dados);

    return res.status(200).json(pedido);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(Number(id));

    if (!pedido) {
      return res.status(404).json({
        message: "Pedido não encontrado",
      });
    }

    await pedido.destroy();

    return res.status(204).send();
  }
}

export default PedidoController;
