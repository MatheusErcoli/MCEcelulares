import { HttpError } from "../types/http_error";
import ItemCarrinho from "../models/ItemCarrinho";

export function carrinhoVazio(itens: ItemCarrinho[]) {
    if (itens.length === 0) {
        throw new HttpError(400, "O carrinho está vazio");
    }
}