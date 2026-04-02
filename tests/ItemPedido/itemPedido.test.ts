import ItemPedidoController from "../../src/controllers/itempedido.controllers";
import ItemPedido from "../../src/models/ItemPedido";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/ItemPedido");


describe("ItemPedidoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os itens do pedido", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (ItemPedido.findAll as jest.Mock).mockResolvedValue([
      { id_item: 1 },
      { id_item: 2 },
    ]);

    await ItemPedidoController.findAll(req, res);

    expect(ItemPedido.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("ItemPedidoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um item pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockItem = { id_item: 1 };

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemPedidoController.findById(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockItem);
  });

  it("esse teste deve retornar erro 404 se não encontrar o item", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemPedidoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("ItemPedidoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar item do pedido com sucesso", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        id_produto: 2,
        quantidade: 3,
        preco_unitario: 50,
      },
    });

    const res = mockResponse();

    const mockItem = { id_item: 1, ...req.body };

    (ItemPedido.create as jest.Mock).mockResolvedValue(mockItem);

    await ItemPedidoController.create(req, res);

    expect(ItemPedido.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockItem);
  });
});

describe("ItemPedidoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar item do pedido com sucesso", async () => {
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

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemPedidoController.update(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1);
    expect(mockItem.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se o item não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemPedidoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("ItemPedidoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar item do pedido com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockItem = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(mockItem);

    await ItemPedidoController.delete(req, res);

    expect(ItemPedido.findByPk).toHaveBeenCalledWith(1);
    expect(mockItem.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar item inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (ItemPedido.findByPk as jest.Mock).mockResolvedValue(null);

    await ItemPedidoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


