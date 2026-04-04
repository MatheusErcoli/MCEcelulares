import { NextFunction, Request, Response } from "express";
import Endereco from "../models/Endereco";
import { HttpError } from "../types/http_error";

class EnderecoController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const enderecos = await Endereco.findAll({
        include: ["usuario"],
      });

      return res.status(200).json(enderecos);
    } catch (error) {
      next(error)
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(Number(id), {
      include: ["usuario"],
    });

    if (!endereco) {
        throw new HttpError(404, "Endereço não encontrado");
    }

    return res.status(200).json(endereco);
    } catch (error) {
      next(error)
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
    const {
      id_usuario,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep,
    } = req.body;

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
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const enderecoEncontrado = await Endereco.findByPk(Number(id));

    if (!enderecoEncontrado) {
        throw new HttpError(404, "Não foi possível atualizar: Endereço não encontrado");
    }

    const dados = req.body;

    await enderecoEncontrado.update(dados);

    return res.status(200).json(enderecoEncontrado);
    } catch (error) {
      next(error)
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(Number(id));

    if (!endereco) {
        throw new HttpError(404, "Não foi possível excluir: Endereço não encontrado");
    }

    await endereco.destroy();

    return res.status(204).send();
    } catch (error) {
      next(error)
    }
  }
}

export default EnderecoController;
