import { Request, Response } from "express";
import Pagamento from "../models/Pagamento";
import Pedido from "../models/Pedido";

class PagamentoController {
  static async findAll(req: Request, res: Response) {
    const pagamentos = await Pagamento.findAll({
      include: [{ model: Pedido, as: "pedido" }],
    });

    return res.status(200).json(pagamentos);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(Number(id), {
      include: [{ model: Pedido, as: "pedido" }],
    });

    if (!pagamento) {
      return res.status(404).json({
        message: "Pagamento não encontrado",
      });
    }

    return res.status(200).json(pagamento);
  }

  static async create(req: Request, res: Response) {
    const { id_pedido, metodo_pagamento, valor, data_pagamento, status } =
      req.body;

    const pagamento = await Pagamento.create({
      id_pedido,
      metodo_pagamento,
      valor,
      data_pagamento,
      status,
    });

    return res.status(201).json(pagamento);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(Number(id));

    if (!pagamento) {
      return res.status(404).json({
        message: "Pagamento não encontrado",
      });
    }

    const dados = req.body;

    await pagamento.update(dados);

    return res.status(200).json(pagamento);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(Number(id));

    if (!pagamento) {
      return res.status(404).json({
        message: "Pagamento não encontrado",
      });
    }

    await pagamento.destroy();

    return res.status(204).send();
  }
}

export default PagamentoController;
