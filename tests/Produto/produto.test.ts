import ProdutoController from "../../src/controllers/produto.controllers";
import Produto from "../../src/models/Produto";

jest.mock("../../src/models/Produto");
//simula o res para testar os métodos
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};
//agrupa os testes do findAll do ProdutoController
describe("ProdutoController - findAll", () => {
  afterEach(() => {//limpa os mocks após cada teste
    jest.clearAllMocks();
  });

  it("esse teste deve retornar validação corretamente", async () => {
    const req: any = {
      query: { page: "1", limit: "10" }, //preparação do query que será usado para teste
    };
    const res = mockResponse();
    //simulação do banco de dados
    (Produto.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [
        { id_produto: 1, nome: "Produto 1" },
        { id_produto: 2, nome: "Produto 2" },
      ],
    });
    //Executa
    await ProdutoController.findAll(req, res);
    //verifica se foi chamado certo os parâmetros
    expect(Produto.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 10,
        offset: 0,
      })
    );
    //verifica se o status foi chamado com os valores corretos
    expect(res.status).toHaveBeenCalledWith(200);
    //verifica a resposta
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        data: expect.any(Array),
      })
    );
  });

  it("esse teste retorna erro caso a paginação esteja errada", async () => {
    const req: any = {
      query: { page: "-1" },
    };
    const res = mockResponse();

    await ProdutoController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Página inválida",
    });
  });
});

describe("ProdutoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar um produto pelo ID", async () => {
    const req: any = {
      params: { id: "1" },
    };
    const res = mockResponse();

    const mockProduto = {
      id_produto: 1,
      nome: "Produto Teste",
    };

    (Produto.findByPk as jest.Mock).mockResolvedValue(mockProduto);

    await ProdutoController.findById(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1, {
      include: ["marca", "categoria"],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduto);
  });

  it("deve retornar 404 se produto não existir", async () => {
    const req: any = {
      params: { id: "1" },
    };
    const res = mockResponse();

    (Produto.findByPk as jest.Mock).mockResolvedValue(null);

    await ProdutoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado",
    });
  });
});

describe("ProdutoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para criar um produto com sucesso", async () => {
    const req: any = {
      body: {
        nome: "Produto Teste",
        descricao: "Descrição",
        preco: 100,
        estoque: 10,
        imagem: "https://imagem.com/produto.jpg",
        destaque: true,
        ativo: true,
        id_marca: 1,
        id_categoria: 2,
      },
    };

    const res = mockResponse();

    const mockProdutoCriado = {
      id_produto: 1,
      ...req.body,
    };

    (Produto.create as jest.Mock).mockResolvedValue(mockProdutoCriado);

    await ProdutoController.create(req, res);

    expect(Produto.create).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProdutoCriado);
  });
});

describe("ProdutoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar o produto com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Produto Atualizado",
      },
    };

    const res = mockResponse();

    const mockProduto = {
      id_produto: 1,
      nome: "Produto Antigo",
      update: jest.fn().mockResolvedValue(true),
    };

    (Produto.findByPk as jest.Mock).mockResolvedValue(mockProduto);

    await ProdutoController.update(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1);
    expect(mockProduto.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduto);
  });

  it("esse teste deve retornar erro caso o produto não existir", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Produto Atualizado",
      },
    };

    const res = mockResponse();

    (Produto.findByPk as jest.Mock).mockResolvedValue(null);

    await ProdutoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado",
    });
  });
});

describe("ProdutoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockProduto = {
      id_produto: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Produto.findByPk as jest.Mock).mockResolvedValue(mockProduto);

    await ProdutoController.delete(req, res);

    expect(Produto.findByPk).toHaveBeenCalledWith(1);
    expect(mockProduto.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 caso não consiga dar o delete", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Produto.findByPk as jest.Mock).mockResolvedValue(null);

    await ProdutoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado",
    });
  });
});