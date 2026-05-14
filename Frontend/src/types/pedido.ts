type ItemPedidoType = {
    id_item: number;
    id_pedido: number;
    nome_produto: string;
    quantidade: number;
    preco_unitario: number;
}

type PedidoType = {
    id_pedido: number;
    id_usuario: number;
    id_endereco: number;
    valor_total: number;
    status: string;
    ativo: boolean;
    data: Date;
    usuario?: UsuarioType;
    endereco?: EnderecoType;
    itens: ItemPedidoType[];
}

type CarrinhoType = {
    id_carrinho: number;
    id_usuario: number;
    data_criacao: Date;
    ativo: boolean;
}

type ItemCarrinhoType = {
    id_item_carrinho: number;
    id_carrinho: number;
    id_produto: number;
    preco_unitario: number;
    quantidade: number;
    produto: ProdutoType;
}