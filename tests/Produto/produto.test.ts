import ProdutoController from "../../src/controllers/produto.controllers";
import Produto from "../../src/models/Produto";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Produto");

describe("ProdutoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar validação corretamente", async () => {
    const req = mockRequest({
      query: { page: "1", limit: "10" },
    });
    const res = mockResponse();
    (Produto.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [
        { id_produto: 1, nome: "Produto 1" },
        { id_produto: 2, nome: "Produto 2" },
      ],
    });
    await ProdutoController.findAll(req, res);
    
    expect(Produto.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 10,
        offset: 0,
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
   
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
    const req = mockRequest({
      query: { page: "-1" },
    });
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

  it("esse teste deve retornar um produto procurado pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
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

  it("esse teste deve retornar erro 404 caso não ache o produto", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
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
    const req = mockRequest({
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
    });

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
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Produto Atualizado",
      },
    });

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
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Produto Atualizado",
      },
    });

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
    const req = mockRequest({
      params: { id: "1" },
    });

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
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Produto.findByPk as jest.Mock).mockResolvedValue(null);

    await ProdutoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Produto não encontrado",
    });
  });
});


