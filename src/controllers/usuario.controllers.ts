import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario";
import { PaginacaoResponse } from "../types/paginacao";
import { HttpError } from "../types/http_error";
import { findByIdOuErroUsuario } from "../utils/FindByIdOuErro/findByIdOuErroUsuario";
import { hashSenha } from "../utils/HashSenha";
import { tratarSenha } from "../utils/tratarSenha";
import { obterPaginacao } from "../utils/paginacao";
import { fazerPaginacaoResponse } from "../utils/paginacaoResponse";
import { emailNaoPodeAlterar } from "../utils/emailNaoPodeAlterar";

interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

class UsuarioController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit, offset } = obterPaginacao(req.query);

      const { count, rows } = await Usuario.findAndCountAll({
        attributes: { exclude: ["senha"] },
        limit,
        offset,
        order: [["id_usuario", "ASC"]],
      });

      const response = fazerPaginacaoResponse(page, limit, count, rows);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.userId !== Number(id) && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para acessar este perfil"));
      }

      const usuario = await findByIdOuErroUsuario(Number(id), {
        attributes: { exclude: ["senha"] },
        include: ["enderecos"],
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

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.userId !== Number(id) && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para alterar este usuário"));
      }

      const usuario = await findByIdOuErroUsuario(Number(id));

      emailNaoPodeAlterar(req.body);

      const dados = await tratarSenha({ ...req.body });

      await usuario.update(dados);

      const usuarioSemSenha = usuario.toJSON();
      delete usuarioSemSenha.senha;

      return res.status(200).json(usuarioSemSenha);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (req.userId !== Number(id) && !req.isAdmin) {
        return next(new HttpError(403, "Você não tem permissão para excluir este usuário"));
      }

      const usuario = await findByIdOuErroUsuario(Number(id));

      await usuario.destroy();

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioController;