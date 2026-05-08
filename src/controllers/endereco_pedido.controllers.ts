import { NextFunction, Request, Response } from 'express';
import EnderecoPedido from '../models/Endereco_pedido';
import { HttpError } from '../types/http_error';
import { findByIdOuErroEnderecoPedido } from '../utils/FindByIdOuErro/findByIdOuErroEnderecoPedido';

interface AuthenticatedRequest extends Request {
    userId?: number;
    isAdmin?: boolean;
}

class EnderecoPedidoController {
    static async findAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id_pedido } = req.query;

            let where: Record<string, any>;
            if (req.isAdmin) {
                where = id_pedido ? { id_pedido: Number(id_pedido) } : {};
            } else {
                where = { id_pedido: req.userId };
            }

            const enderecosPedido = await EnderecoPedido.findAll({ where });

            return res.status(200).json(enderecosPedido);
        } catch (error) {
            next(error);
        }
    }

    static async findById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const enderecoPedidos = await findByIdOuErroEnderecoPedido(Number(id), {
                include: ["pedido"],
            });

            return res.status(200).json(enderecoPedidos);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id_pedido, endereco, numero, complemento, bairro, cidade, estado, cep } = req.body;

            const novoEnderecoPedido = await EnderecoPedido.create({
                id_pedido,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep
            });
            return res.status(201).json(novoEnderecoPedido);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const enderecoPedidoEncontrado = await findByIdOuErroEnderecoPedido(Number(id));

            await enderecoPedidoEncontrado.update(req.body);

            return res.status(200).json(enderecoPedidoEncontrado);
        } catch (error) {
            next(error);
        }

    }

    static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const enderecoPedidoEncontrado = await findByIdOuErroEnderecoPedido(Number(id));

            await enderecoPedidoEncontrado.destroy();

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default EnderecoPedidoController;