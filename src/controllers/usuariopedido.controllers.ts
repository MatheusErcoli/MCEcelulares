import { NextFunction, Request, Response } from "express";
import UsuarioPedido from "../models/Usuario_pedido";
import { findByIdOuErroUsuarioPedido } from "../utils/FindByIdOuErro/findByIdOuErroUsuarioPedido";

interface AuthenticatedRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

class UsuarioPedidoController {
  static async findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id_pedido } = req.query;

      const where = id_pedido ? { id_pedido: Number(id_pedido) } : {};

      const usuariosPedido = await UsuarioPedido.findAll({
        where,
        include: ["pedido"],
      });

      return res.status(200).json(usuariosPedido);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuarioPedido = await findByIdOuErroUsuarioPedido(Number(id), {
        include: ["pedido"],
      });

      return res.status(200).json(usuarioPedido);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id_pedido, nome, email, cpf, telefone } = req.body;

      const usuarioPedido = await UsuarioPedido.create({
        id_pedido,
        nome,
        email,
        cpf,
        telefone,
      });

      return res.status(201).json(usuarioPedido);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuarioPedido = await findByIdOuErroUsuarioPedido(Number(id));

      await usuarioPedido.update(req.body);

      return res.status(200).json(usuarioPedido);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuarioPedido = await findByIdOuErroUsuarioPedido(Number(id));

      await usuarioPedido.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioPedidoController;
