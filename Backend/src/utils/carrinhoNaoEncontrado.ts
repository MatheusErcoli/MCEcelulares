import { HttpError } from "../types/http_error";
import Carrinho from "../models/Carrinho";

export function carrinhoNaoEncontrado(carrinho: Carrinho | null): Carrinho {
    if (!carrinho) {
        throw new HttpError(404, "Carrinho não encontrado");
    }

    return carrinho;
}