import { Request, Response } from "express";
import Funcionario from "../models/Funcionario";
import { PaginatedResponse } from "../types/pagination";

class FuncionarioController {
  static async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    if (page < 1) {
      return res.status(400).json({
        message: "Página inválida",
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Funcionario.findAndCountAll({
      limit,
      offset,
      order: [["id_funcionario", "ASC"]],
    });

    const response: PaginatedResponse<(typeof rows)[number]> = {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      data: rows,
    };

    return res.status(200).json(response);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await Funcionario.findByPk(Number(id));

    if (!funcionario) {
      return res.status(404).json({
        message: "Funcionário não encontrado",
      });
    }

    return res.status(200).json(funcionario);
  }

  static async create(req: Request, res: Response) {
    const {
      nome,
      email,
      telefone,
      cargo,
      data_admissao,
      salario,
      ativo,
    } = req.body;

    const funcionario = await Funcionario.create({
      nome,
      email,
      telefone,
      cargo,
      data_admissao,
      salario,
      ativo,
    });

    return res.status(201).json(funcionario);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await Funcionario.findByPk(Number(id));

    if (!funcionario) {
      return res.status(404).json({
        message: "Funcionário não encontrado",
      });
    }

    const dados = req.body;

    await funcionario.update(dados);

    return res.status(200).json(funcionario);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await Funcionario.findByPk(Number(id));

    if (!funcionario) {
      return res.status(404).json({
        message: "Funcionário não encontrado",
      });
    }

    await funcionario.destroy();

    return res.status(204).send();
  }
}

export default FuncionarioController;
