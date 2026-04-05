import { NextFunction, Request, Response } from "express";
import Pagamento from "../models/Pagamento";
import { HttpError } from "../types/http_error";

class PagamentoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const pagamentos = await Pagamento.findAll({
        include: ["pedido"],
      });

      return res.status(200).json(pagamentos);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pagamento = await Pagamento.findByPk(Number(id), {
        include: ["pedido"],
      });

      if (!pagamento) throw new HttpError(404, "Pagamento não encontrado");

      return res.status(200).json(pagamento);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(Number(id));

    if (!pagamento) throw new HttpError(404, "Pagamento não encontrado");

    const dados = req.body;

    await pagamento.update(dados);

    return res.status(200).json(pagamento);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const pagamento = await Pagamento.findByPk(Number(id));

    if (!pagamento) throw new HttpError(404, "Pagamento não encontrado");

    await pagamento.destroy();

    return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default PagamentoController;
