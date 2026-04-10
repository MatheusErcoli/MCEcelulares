import { hashSenha } from "./HashSenha";

type comSenha = {
    senha?: string;
};

export async function tratarSenha<T extends comSenha>(dados: T): Promise<T> {

    if (dados.senha && dados.senha.trim() !== "") {
        dados.senha = await hashSenha(dados.senha);
    } else {
        delete dados.senha;
    }

    return dados;
}