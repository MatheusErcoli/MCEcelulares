import { Request, Response } from "express";
import Funcionario from "../models/Funcionario";
import {
  createFuncionarioSchema,
  updateFuncionarioSchema,
} from "../validators/funcionarioValidator";

class FuncionarioController {
  static async findAll(req: Request, res: Response) {
    try {
      const funcionarios = await Funcionario.findAll();

      return res.status(200).json(funcionarios);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar funcionários" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const funcionario = await Funcionario.findByPk(Number(id));

      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      return res.status(200).json(funcionario);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar funcionário" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = createFuncionarioSchema.parse(req.body);

      const {
        id_pedido,
        nome,
        email,
        telefone,
        cargo,
        data_admissao,
        salario,
        ativo,
      } = data;

      const funcionario = await Funcionario.create({
        id_pedido,
        nome,
        email,
        telefone,
        cargo,
        data_admissao,
        salario,
        ativo,
      });

      return res.status(201).json(funcionario);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({ message: "Erro ao criar funcionário" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const dados = updateFuncionarioSchema.parse(req.body);

      const funcionario = await Funcionario.findByPk(Number(id));

      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      await funcionario.update(dados);

      return res.status(200).json(funcionario);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }

      return res.status(500).json({ message: "Erro ao atualizar funcionário" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const funcionario = await Funcionario.findByPk(Number(id));

      if (!funcionario) {
        return res.status(404).json({ message: "Funcionário não encontrado" });
      }

      await funcionario.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar funcionário" });
    }
  }
}

export default FuncionarioController;
