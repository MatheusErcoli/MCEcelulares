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
import Produto from "../models/Produto";
import { decrementarEstoque } from "../utils/decrementarEstoque";
import { validarItensCarrinho } from "../utils/validarItensCarrinho";
import { adicionarFiltroNumero } from "../utils/adicionarFiltroNumero";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

class PedidoController {
static async findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit, offset } = obterPaginacao(req.query);

    const where: Record<string, any> = { ativo: true };

    adicionarFiltroNumero(where, "id_usuario", req.query.id_usuario as string);

    if (req.query.status) {
      where.status = req.query.status;
    }

      const { count, rows } = await Pedido.findAndCountAll({
        where,
        include: [
          "usuario",
          "endereco",
          { association: "itens" },
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
          { association: "itens" },
        ],
      });

      if (!pedido) throw new HttpError(404, "Pedido não encontrado");

      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id_usuario = req.userId;
      const { id_endereco, valor_total } = req.body;

      const carrinho = carrinhoNaoEncontrado(
        await Carrinho.findOne({ where: { id_usuario } }),
      );

      const itensCarrinho = await ItemCarrinho.findAll({
        where: { id_carrinho: carrinho.id_carrinho },
        include: ["produto"],
      });

      carrinhoVazio(itensCarrinho);
      validarItensCarrinho(itensCarrinho);

      const pedido = await Pedido.create({ id_usuario, id_endereco, valor_total });

      await ItemPedido.bulkCreate(
        itensCarrinho.map((item: any) => ({
          id_pedido: pedido.id_pedido,
          nome_produto: item.produto.nome,
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        })),
      );

      await decrementarEstoque(itensCarrinho);
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