import { NextFunction, Request, Response } from "express";
import Usuario from "../models/Usuario";
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
      return res.status(200).json(fazerPaginacaoResponse(page, limit, count, rows));
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const usuario = await findByIdOuErroUsuario(req.userId!, {
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
      const { nome, email, senha, cpf, telefone, ativo = true, admin = false } = req.body;
      const senhaHash = await hashSenha(senha);
      await Usuario.create({ nome, email, senha: senhaHash, cpf, telefone, ativo, admin });
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const usuario = await findByIdOuErroUsuario(req.userId!);
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
      const usuario = await findByIdOuErroUsuario(req.userId!);
      await usuario.destroy();
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default UsuarioController;