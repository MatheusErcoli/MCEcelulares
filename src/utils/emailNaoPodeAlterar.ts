import { HttpError } from "../types/http_error";

type comEmail = {
    email?: string;
}

export function emailNaoPodeAlterar<T extends comEmail>(dados: T): void {

    if (dados.email !== undefined) {
        throw new HttpError(400, "O email não pode ser alterado");
    }
}