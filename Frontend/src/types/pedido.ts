type StatusPedido = "pendente" | "confirmado" | "enviado" | "entregue" | "cancelado";

type ItemPedidoType = {
  id_item_pedido: number;
  id_pedido: number;
  id_produto: number;
  nome_produto: string;
  quantidade: number;
  preco_unitario: number;
};

type UsuarioPedidoType = {
  id_usuario_pedido: number;
  id_usuario: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
};

type EnderecoPedidoType = {
  id_endereco_pedido: number;
  id_endereco: number;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

type PedidoType = {
  id_pedido: number;
  valor_total: number;
  status: StatusPedido;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  usuarioPedido: UsuarioPedidoType;
  enderecoPedido: EnderecoPedidoType;
  itens: ItemPedidoType[];
};

type CarrinhoType = {
  id_carrinho: number;
  id_usuario: number;
  data_criacao: Date;
  ativo: boolean;
};

type ItemCarrinhoType = {
  id_item_carrinho: number;
  id_carrinho: number;
  id_produto: number;
  preco_unitario: number;
  quantidade: number;
  produto: ProdutoType;
};