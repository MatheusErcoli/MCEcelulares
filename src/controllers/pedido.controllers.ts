import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Usuario from "../models/Usuario";
import Funcionario from "../models/Funcionario";
import ItemPedido from "../models/ItemPedido";

class PedidoController {
  static async findAll(req: Request, res: Response) {
    const pedidos = await Pedido.findAll({
      where: {
        ativo: true,
      },
      include: [
        { model: Usuario, as: "usuario" },
        { model: Funcionario, as: "funcionario" },
        { model: ItemPedido, as: "itens" },
      ],
    });

    return res.status(200).json(pedidos);
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
