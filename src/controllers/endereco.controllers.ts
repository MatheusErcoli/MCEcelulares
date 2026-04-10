import { NextFunction, Request, Response } from "express";
import Endereco from "../models/Endereco";
import { HttpError } from "../types/http_error";
import { findByIdOuErroEndereco } from "../utils/FindByIdOuErro/findByIdOuErroEndereco";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

class EnderecoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_usuario } = req.query;

      const enderecos = await Endereco.findAll({
        where: id_usuario ? { id_usuario: Number(id_usuario) } : {},
      });

      return res.status(200).json(enderecos);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const endereco = await findByIdOuErroEndereco(Number(id), {
        include: ["usuario"],
      });

      return res.status(200).json(endereco);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id_usuario = req.userId;
      const { endereco, numero, complemento, bairro, cidade, estado, cep } = req.body;

      const novoEndereco = await Endereco.create({
        id_usuario,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
      });

      return res.status(201).json(novoEndereco);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const enderecoEncontrado = await findByIdOuErroEndereco(Number(id));

      await enderecoEncontrado.update(req.body);

      return res.status(200).json(enderecoEncontrado);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const endereco = await findByIdOuErroEndereco(Number(id));

      await endereco.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default EnderecoController;