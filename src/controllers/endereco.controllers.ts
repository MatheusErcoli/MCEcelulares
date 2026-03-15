import { Request, Response } from "express";
import Endereco from "../models/Endereco";

class EnderecoController {
  static async findAll(req: Request, res: Response) {
    const enderecos = await Endereco.findAll({
      include: ["usuario"],
    });

    return res.status(200).json(enderecos);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(Number(id), {
      include: ["usuario"],
    });

    if (!endereco) {
      return res.status(404).json({
        message: "Endereço não encontrado",
      });
    }

    return res.status(200).json(endereco);
  }

  static async create(req: Request, res: Response) {
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
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const enderecoEncontrado = await Endereco.findByPk(Number(id));

    if (!enderecoEncontrado) {
      return res.status(404).json({
        message: "Endereço não encontrado",
      });
    }

    const dados = req.body;

    await enderecoEncontrado.update(dados);

    return res.status(200).json(enderecoEncontrado);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const endereco = await Endereco.findByPk(Number(id));

    if (!endereco) {
      return res.status(404).json({
        message: "Endereço não encontrado",
      });
    }

    await endereco.destroy();

    return res.status(204).send();
  }
}

export default EnderecoController;
