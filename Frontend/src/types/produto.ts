type ProdutoType = {
  id_produto: number;
  nome: string;
  descricao: string | null;
  preco: number;
  imagem: string | null; 
  estoque: number;
  destaque: boolean;
  ativo: boolean;
  id_marca: number;
  id_categoria: number;
  marca?: MarcaType;
  categoria?: CategoriaType;
}

type PaginatedResponse<T> = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
};

type CategoriaType = {
  id_categoria: number;
  nome: string;
  descricao: string | null;
  ativo: boolean;
}

type MarcaType = {
  id_marca: number;
  nome: string;
  ativo: boolean;
}