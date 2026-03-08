import { Request, Response } from "express";
import Funcionario from "../models/Funcionario";

class FuncionarioController {
    
    static async findAll(req: Request, res: Response){

        const funcionarios = await Funcionario.findAll();

        res.json(funcionarios);
    }

    static async findById(req: Request, res: Response){
        const { id } = req.params;
        const funcionario = await Funcionario.findByPk(Number(id));

        res.json(funcionario);
    }

    static async create(req: Request, res: Response){
        const { id_pedido, nome, email, telefone, cargo, data_admissao, salario, ativo } = req.body;
        const funcionario = await Funcionario.create({
            id_pedido,
            nome,
            email,
            telefone,
            cargo,
            data_admissao,
            salario,
            ativo
        });

        res.status(201).json(funcionario);
    }

    static async update(req: Request, res: Response){
        const { id } = req.params;
        const { id_pedido, nome, email, telefone, cargo, data_admissao, salario, ativo } = req.body;
        const funcionarioAtualizado = await Funcionario.findByPk(Number(id));
        if(funcionarioAtualizado){
            await funcionarioAtualizado.update({
                id_pedido: id_pedido,
                nome: nome,
                email: email,
                telefone: telefone,
                cargo: cargo,
                data_admissao: data_admissao,
                salario: salario,
                ativo: ativo
            });
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }

        res.status(200).json(funcionarioAtualizado);
    }

    static async delete(req: Request, res: Response){
        const { id } = req.params;
        const funcionario = await Funcionario.findByPk(Number(id));
        if(funcionario){
            await funcionario.destroy();
        } else {
            res.status(404).json({ message: "Funcionário não encontrado" });
        }
        res.status(204).send();
    }
}

export default FuncionarioController;