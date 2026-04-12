import { HttpError } from "../types/http_error";
import ItemCarrinho from "../models/ItemCarrinho";
import Produto from "../models/Produto";

export function validarItensCarrinho(itens: ItemCarrinho[]) {
    for (const item of itens) {
        const produto = (item as any).produto as Produto;

        if (!produto.ativo)
            throw new HttpError(400, `Produto "${produto.nome}" não está mais disponível`);

        if (produto.estoque < item.quantidade)
            throw new HttpError(400, `Produto "${produto.nome}" não tem estoque suficiente. Disponível: ${produto.estoque}`);
    }
}