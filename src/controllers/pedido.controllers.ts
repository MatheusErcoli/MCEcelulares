import { NextFunction, Request, Response } from "express";
import Pedido from "../models/Pedido";
import ItemPedido from "../models/ItemPedido";
import { PaginacaoResponse } from "../types/paginacao";
import { HttpError } from "../types/http_error";
import ItemCarrinho from "../models/ItemCarrinho";
import Carrinho from "../models/Carrinho";
import { obterPaginacao } from "../utils/paginacao";
import { fazerPaginacaoResponse } from "../utils/paginacaoResponse";
import { findByIdOuErroPedido } from "../utils/FindByIdOuErro/findByIdOuErroPedido";
import { carrinhoNaoEncontrado } from "../utils/carrinhoNaoEncontrado";
import { carrinhoVazio } from "../utils/carrinhoVazio";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

class PedidoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, offset } = obterPaginacao(req.query);

      const { count, rows } = await Pedido.findAndCountAll({
        where: { ativo: true },
        include: [
          "usuario",
          "endereco",
          { association: "itens", include: ["produto"] },
        ],
        distinct: true,
        col: "id_pedido",
        limit,
        offset: (page - 1) * limit,
        order: [["id_pedido", "DESC"]],
      });

      const response = fazerPaginacaoResponse(page, limit, count, rows);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id), {
        include: [
          "usuario",
          "endereco",
          { association: "itens", include: ["produto"] },
        ],
      });

      if (!pedido) throw new HttpError(404, "Pedido não encontrado");

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction,) {
    try {
      const id_usuario = req.userId;
      const { id_endereco, valor_total } = req.body;

      const carrinho = carrinhoNaoEncontrado(
        await Carrinho.findOne({ where: { id_usuario } }),
      );

      const itensCarrinho = await ItemCarrinho.findAll({
        where: { id_carrinho: carrinho.id_carrinho },
      });

      carrinhoVazio(itensCarrinho);

      const pedido = await Pedido.create({
        id_usuario,
        id_endereco,
        valor_total,
      });

      await ItemPedido.bulkCreate(
        itensCarrinho.map((item) => ({
          id_pedido: pedido.id_pedido,
          id_produto: item.id_produto,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        })),
      );

      await Carrinho.destroy({ where: { id_carrinho: carrinho.id_carrinho } });

      return res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id));

      await pedido.update(req.body);

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const pedido = await findByIdOuErroPedido(Number(id));

      await pedido.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default PedidoController;
