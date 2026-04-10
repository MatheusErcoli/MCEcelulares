import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import { PaginatedResponse } from "../types/paginated";
import { HttpError } from "../types/http_error";
import { findByIdOuErro } from "../utils/findByIdOuErro";
import { hashSenha } from "../utils/HashSenha";
import { tratarSenha } from "../utils/tratarSenha";

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

      const usuario = await findByIdOuErro(Number(id), {
        attributes: { exclude: ["senha"] },
        include: ['enderecos'],
      });

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

      const senhaHash = await hashSenha(senha);

      const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
        cpf,
        telefone,
        ativo,
        admin,
      });

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const usuario = await findByIdOuErro(Number(id));

      if (req.body.email) throw new HttpError(400, "Email não pode ser alterado");

      const dados = await tratarSenha({ ...req.body });

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

      const usuario = await findByIdOuErro(Number(id));

      await usuario.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioController;
