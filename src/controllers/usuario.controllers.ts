import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import { PaginatedResponse } from "../types/paginated";
import { HttpError } from "../types/http_error";

class UsuarioController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

      const { count, rows } = await Usuario.findAndCountAll({
        attributes: { exclude: ["senha"] },
        limit,
        offset: (page - 1) * limit,
        order: [["id_usuario", "ASC"]],
      });

      const response: PaginatedResponse<(typeof rows)[number]> = {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        data: rows,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(Number(id), {
        attributes: { exclude: ["senha"] },
        include: ['enderecos'],
      });

      if (!usuario) {
        throw new HttpError(404, "Usuário não encontrado");
      }

      return res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      next(error);
    }
  }

static async update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(Number(id));

    if (!usuario) {
      throw new HttpError(404, "Usuário não encontrado");
    }

    if (req.body.email) {
      throw new HttpError(400, "Email não pode ser alterado");
    }
    
    const dados = { ...req.body };

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    await usuario.update(dados);

    const usuarioSemSenha = usuario.toJSON();
    delete usuarioSemSenha.senha;

    return res.status(200).json(usuarioSemSenha);
  } catch (error) {
    next(error);
  }
}

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(Number(id));

      if (!usuario) {
        throw new HttpError(404, "Usuário não encontrado");
      }

      await usuario.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioController;
