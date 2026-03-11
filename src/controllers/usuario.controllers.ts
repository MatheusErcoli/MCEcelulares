import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
} from "../validators/usuarioValidator";

class UsuarioController {
  static async findAll(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["senha"] },
      });

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(Number(id), {
        attributes: { exclude: ["senha"] },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createUsuarioSchema.parse(req.body);
      const {
        nome,
        email,
        senha,
        cpf,
        telefone,
        ativo = true,
        admin = false,
      } = data;

      const senhaHash = await bcrypt.hash(senha, 10);

      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        cpf,
        telefone,
        ativo,
        admin,
      });

      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      return res.status(201).json(usuarioSemSenha);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res
          .status(400)
          .json({ message: "Erro de validação", errors: error.errors });
      }
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dados = updateUsuarioSchema.parse(req.body);

      const usuario = await Usuario.findByPk(Number(id));

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10);
      }

      await usuario.update(dados);

      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      return res.status(200).json(usuarioSemSenha);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar usuário",
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(Number(id));

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }

      await usuario.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }
}

export default UsuarioController;
