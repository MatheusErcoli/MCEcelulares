import { Request, Response } from "express";
import Usuario from "../models/Usuario";

class UsuarioController {

    static async findAll(req: Request, res: Response) {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['senha'] }
        });
        res.json(usuarios);
    }

    static async findById(req: Request, res:Response) {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(Number(id), {
            attributes: { exclude: ['senha'] }
        });

        res.json(usuario);
    }

    static async create(req: Request, res: Response) {
        const { 
            nome,
            email,
            senha,
            cpf,
            telefone,
            ativo,
            admin
        } = req.body;

        const usuario = await Usuario.create({
            nome,
            email,
            senha,
            cpf,
            telefone,
            ativo,
            admin
        });

        res.json(usuario);
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { 
            nome,
            email,
            senha,
            cpf,
            telefone,
            ativo,
            admin
        } = req.body;
        const usuarioAtualizado = await Usuario.findByPk(Number(id));
        if(usuarioAtualizado){
            await usuarioAtualizado.update({
                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf,
                telefone: telefone,
                ativo: ativo,
                admin: admin
            });
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json(usuarioAtualizado);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(Number(id));
        if(usuario){
            await usuario.destroy();
        } else {
            res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(204).send();
    }
}

export default UsuarioController;