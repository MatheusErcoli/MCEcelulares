import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";

class UsuarioController {
  static async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    if (page < 1) {
      return res.status(400).json({
        message: "Página inválida",
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Usuario.findAndCountAll({
      attributes: { exclude: ["senha"] },
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  }
  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(Number(id), {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json(usuario);
  }

  static async create(req: Request, res: Response) {
    const {
      nome,
      email,
      senha,
      cpf,
      telefone,
      ativo = true,
      admin = false,
    } = req.body;

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
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(Number(id));

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    const dados = req.body;

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    if (req.body.email) {
      return res.status(400).json({
        message: "Email não pode ser alterado",
      });
    }

    await usuario.update(dados);

    const usuarioSemSenha = usuario.toJSON();
    delete usuarioSemSenha.senha;

    return res.status(200).json(usuarioSemSenha);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(Number(id));

    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    await usuario.destroy();

    return res.status(204).send();
  }
}

export default UsuarioController;
