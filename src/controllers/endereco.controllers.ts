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

    static async update(req: Request, res: Response) {
        const { id } = req.params;
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
        const enderecoAtualizado = await Endereco.findByPk(Number(id));
        
        if (enderecoAtualizado) {
            await enderecoAtualizado.update({
                id_usuario: id_usuario,
                endereco: endereco,
                numero: numero,
                complemento: complemento,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                cep: cep
            });
        } else {
            res.status(404).json({ message: "Endereço não encontrado" });
        }
        res.status(200).json(enderecoAtualizado);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const endereco = await Endereco.findByPk(Number(id));
        if (endereco) {
            await endereco.destroy();
        } else {
            res.status(404).json({ message: "Endereço não encontrado" });
        }
        res.status(204).send();
    }
}

export default EnderecoController;