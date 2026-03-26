import ItemCarrinhoController from "../../src/controllers/itemCarrinho.controllers";
import ItemCarrinho from "../../src/models/ItemCarrinho";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/ItemCarrinho");


describe("ItemCarrinhoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os itens do carrinho", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (ItemCarrinho.findAll as jest.Mock).mockResolvedValue([
      { id_item_carrinho: 1 },
      { id_item_carrinho: 2 },
    ]);

    await ItemCarrinhoController.findAll(req, res);

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

    const mockItem = { id_item_carrinho: 1 };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.findById(req, res);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockItem);
  });

  it("esse teste deve retornar erro 404 se não encontrar o item", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
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

    (ItemCarrinho.findAll as jest.Mock).mockResolvedValue([
      { id_item_carrinho: 1 },
    ]);

    await ItemCarrinhoController.findByCartId(req, res);

    expect(ItemCarrinho.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id_carrinho: 1 },
      })
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
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 3,
      },
    });

    const res = mockResponse();

    const mockItem = { id_item_carrinho: 1, ...req.body };

    (ItemCarrinho.create as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.create(req, res);

    expect(ItemCarrinho.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockItem);
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

    const mockItem = {
      update: jest.fn().mockResolvedValue(true),
    };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.update(req, res);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockItem.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se item não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
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

    const mockItem = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemCarrinhoController.delete(req, res);

    expect(ItemCarrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockItem.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar item inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (ItemCarrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemCarrinhoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


