type UsuarioType = {
    id_usuario: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    ativo: boolean;
    admin: boolean;
    enderecos?: EnderecoType[];
}

type EnderecoType = {
  id_endereco: number;
  id_usuario: number;
  endereco: string;
  numero: string;
  complemento: string | null;
  bairro: string | null;
  cidade: string;
  estado: string;
  cep: string;
}