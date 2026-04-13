import { HttpError } from "../types/http_error";
import Produto from "../models/Produto";

export function validarProdutoDisponivel(produto: Produto) {
    if (!produto.ativo)
        throw new HttpError(400, `Produto "${produto.nome}" não está mais disponível`);

    if (produto.estoque <= 0)
        throw new HttpError(400, `Produto "${produto.nome}" está fora de estoque`);
}