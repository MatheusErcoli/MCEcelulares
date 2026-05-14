import ItemCarrinho from "../../src/models/ItemCarrinho";
import Produto from "../../src/models/Produto";
import Carrinho from "../../src/models/Carrinho";
import ItemCarrinhoController from "../../src/controllers/itemcarrinho.controllers";
import { mockRequest, mockResponse } from "../test.helpers";
import { salvarOuAtualizarItemCarrinho } from "../../src/utils/salvarOuAtualizarItemCarrinho";

jest.mock("../../src/models/ItemCarrinho");
jest.mock("../../src/models/Produto");
jest.mock("../../src/models/Carrinho");

jest.mock("../../src/utils/salvarOuAtualizarItemCarrinho", () => ({
  salvarOuAtualizarItemCarrinho: jest.fn(),
}));

describe("ItemCarrinhoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os itens do carrinho", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    (ItemCarrinho.findAll as jest.Mock).mockResolvedValue([
      { id_item_carrinho: 1 },
      { id_item_carrinho: 2 },
    ]);

    await ItemCarrinhoController.findAll(req, res, next);

    expect(ItemCarrinho.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("ItemCarrinhoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um item pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockItem = { id_item_carrinho: 1 };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.findById(req, res, next);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockItem);
  });

  it("esse teste deve retornar erro 404 se nao encontrar o item", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.findById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("ItemCarrinhoController - findByCartId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar itens pelo id_carrinho", async () => {
    const req = mockRequest({
      params: { id_carrinho: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (ItemCarrinho.findAll as jest.Mock).mockResolvedValue([
      { id_item_carrinho: 1 },
    ]);

    await ItemCarrinhoController.findByCartId(req, res, next);

    expect(ItemCarrinho.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id_carrinho: 1 },
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("ItemCarrinhoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar item do carrinho com sucesso", async () => {
    const req = mockRequest({
      userId: 1,
      body: {
        id_carrinho: 1,
        id_produto: 2,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockProduto = {
      id_produto: 2,
      nome: "Produto Teste",
      preco: 50,
      ativo: true,
      estoque: 10,
    };

    const mockCarrinho = {
      id_carrinho: 1,
      id_usuario: 1,
      ativo: true,
    };

    const mockItem = {
      id_item_carrinho: 1,
      id_produto: 2,
      preco_unitario: 50,
      quantidade: 1,
    };

    (Produto.findByPk as jest.Mock).mockResolvedValue(mockProduto);
    (Carrinho.findOne as jest.Mock).mockResolvedValue(mockCarrinho);
    (salvarOuAtualizarItemCarrinho as jest.Mock).mockResolvedValue({ item: mockItem, criado: true });

    await ItemCarrinhoController.create(req as any, res as any, next);

    expect(salvarOuAtualizarItemCarrinho).toHaveBeenCalledWith(1, 2, 50);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id_produto: mockItem.id_produto,
      preco_unitario: mockItem.preco_unitario,
    });
  });
});

describe("ItemCarrinhoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar item do carrinho com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        quantidade: 5,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockItem = {
      quantidade: 2,
      save: jest.fn().mockResolvedValue(true),
    };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.update(req, res, next);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1, {
      include: ["carrinho"],
    });
    expect(mockItem.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se item nao existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();
    const next = jest.fn();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.update(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("ItemCarrinhoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar item do carrinho com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockItem = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.delete(req, res, next);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1, {
      include: ["carrinho"],
    });

    expect(mockItem.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar item inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.delete(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
