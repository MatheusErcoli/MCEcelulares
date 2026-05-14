export type UsuarioInput = {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
    ativo?: boolean;
    admin?: boolean;
};