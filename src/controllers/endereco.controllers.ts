import { Request, Response } from "express";
import Endereco from "../models/Endereco";
import {
  createEnderecoSchema,
  updateEnderecoSchema,
} from "../validators/enderecoValidator";

class EnderecoController {
  static async findAll(req: Request, res: Response) {
    try {
      const enderecos = await Endereco.findAll({
        include: ["usuario"],
      });

      return res.status(200).json(enderecos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar endereços" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const endereco = await Endereco.findByPk(Number(id), {
        include: ["usuario"],
      });

      if (!endereco) {
        return res.status(404).json({ message: "Endereço não encontrado" });
      }

      return res.status(200).json(endereco);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar endereço" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createEnderecoSchema.parse(req.body);

      const {
        id_usuario,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep,
      } = data;

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
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao criar endereço",
      });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateEnderecoSchema.parse(req.body);

      const enderecoEncontrado = await Endereco.findByPk(Number(id));

      if (!enderecoEncontrado) {
        return res.status(404).json({ message: "Endereço não encontrado" });
      }

      await enderecoEncontrado.update(dados);

      return res.status(200).json(enderecoEncontrado);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar endereço",
      });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const endereco = await Endereco.findByPk(Number(id));

      if (!endereco) {
        return res.status(404).json({ message: "Endereço não encontrado" });
      }

      await endereco.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar endereço" });
    }
  }
}

export default EnderecoController;
