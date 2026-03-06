import { Request, Response } from "express";
import Endereco from "../models/Endereco";

class EnderecoController {

    static async findAll(req: Request, res: Response) {
        const enderecos = await Endereco.findAll({
            include: ["usuario"]
        });

        res.json(enderecos);
    }

    static async findById(req: Request, res: Response) {
        const { id } = req.params;

        const endereco = await Endereco.findByPk(Number(id), {
            include: ["usuario"]
        });

        res.json(endereco);
    }

    static async create(req: Request, res: Response) {

        const {
            id_usuario,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        } = req.body;

        const novoEndereco = await Endereco.create({
            id_usuario,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep
        });

        res.json(novoEndereco);
    }
}

export default EnderecoController;