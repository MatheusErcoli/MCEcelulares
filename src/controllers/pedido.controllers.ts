import { NextFunction, Request, Response } from "express";
import Pedido from "../models/Pedido";
import Carrinho from "../models/Carrinho";
import { obterPaginacao } from "../utils/paginacao";
import { fazerPaginacaoResponse } from "../utils/paginacaoResponse";
import { findByIdOuErroPedido } from "../utils/FindByIdOuErro/findByIdOuErroPedido";
import { adicionarFiltroNumero } from "../utils/adicionarFiltroNumero";
import { decrementarEstoque } from "../utils/decrementarEstoque";
import { obterCarrinhoComItens } from "../utils/obterCarrinhoComItens";
import { calcularValorTotal } from "../utils/calcularValorTotal";
import { criarItensPedido } from "../utils/criarItensPedido";

interface AuthenticatedRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

class PedidoController {
  static async findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { page, limit } = obterPaginacao(req.query);
      const where: Record<string, any> = { ativo: true };

      if (!req.isAdmin) where.id_usuario = req.userId;

      if (req.query.status) where.status = req.query.status;

      const { count, rows } = await Pedido.findAndCountAll({
        where,
        include: ["usuario", "endereco", { association: "itens" }],
        distinct: true,
        col: "id_pedido",
        limit,
        offset: (page - 1) * limit,
        order: [["id_pedido", "DESC"]],
      });

      return res.status(200).json(fazerPaginacaoResponse(page, limit, count, rows));
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const pedido = await findByIdOuErroPedido(Number(req.params.id), {
        include: ["usuario", "endereco", { association: "itens" }],
      });
      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { carrinho, itensCarrinho } = await obterCarrinhoComItens(req.userId!);
      const valor_total = calcularValorTotal(itensCarrinho);
      const pedido = await Pedido.create({
        id_usuario: req.userId,
        id_endereco: req.body.id_endereco,
        valor_total,
      });

      await criarItensPedido(pedido.id_pedido, itensCarrinho);
      await decrementarEstoque(itensCarrinho);
      await Carrinho.destroy({ where: { id_carrinho: carrinho.id_carrinho } });

      return res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const pedido = await findByIdOuErroPedido(Number(req.params.id));
      await pedido.update(req.body);
      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const pedido = await findByIdOuErroPedido(Number(req.params.id));
      await pedido.destroy();
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default PedidoController;