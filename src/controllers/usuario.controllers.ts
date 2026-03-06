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
}

export default UsuarioController;