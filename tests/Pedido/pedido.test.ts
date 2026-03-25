import PedidoController from "../../src/controllers/pedido.controllers";
import Pedido from "../../src/models/Pedido";

jest.mock("../../src/models/Pedido");

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("PedidoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar pedidos com paginação", async () => {
    const req: any = {
      query: { page: "1", limit: "10" },
    };

    const res = mockResponse();

    (Pedido.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [{ id_pedido: 1 }, { id_pedido: 2 }],
    });

    await PedidoController.findAll(req, res);

    expect(Pedido.findAndCountAll).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        total: 2,
        data: expect.any(Array),
      })
    );
  });

  it("esse teste deve retornar erro se a página for inválida", async () => {
    const req: any = {
      query: { page: "-1" },
    };

    const res = mockResponse();

    await PedidoController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("PedidoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um pedido pelo ID", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockPedido = { id_pedido: 1 };

    (Pedido.findByPk as jest.Mock).mockResolvedValue(mockPedido);

    await PedidoController.findById(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPedido);
  });

  it("esse teste deve retornar erro 404 se não encontrar o pedido", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Pedido.findByPk as jest.Mock).mockResolvedValue(null);

    await PedidoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("PedidoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar um pedido com sucesso", async () => {
    const req: any = {
      body: {
        id_usuario: 1,
        id_funcionario: 2,
        valor_total: 100,
      },
    };

    const res = mockResponse();

    const mockPedido = { id_pedido: 1, ...req.body };

    (Pedido.create as jest.Mock).mockResolvedValue(mockPedido);

    await PedidoController.create(req, res);

    expect(Pedido.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPedido);
  });
});

describe("PedidoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar o pedido com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        valor_total: 200,
      },
    };

    const res = mockResponse();

    const mockPedido = {
      update: jest.fn().mockResolvedValue(true),
    };

    (Pedido.findByPk as jest.Mock).mockResolvedValue(mockPedido);

    await PedidoController.update(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1);
    expect(mockPedido.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se o pedido não existir", async () => {
    const req: any = {
      params: { id: "1" },
      body: {},
    };

    const res = mockResponse();

    (Pedido.findByPk as jest.Mock).mockResolvedValue(null);

    await PedidoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("PedidoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar o pedido com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockPedido = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Pedido.findByPk as jest.Mock).mockResolvedValue(mockPedido);

    await PedidoController.delete(req, res);

    expect(Pedido.findByPk).toHaveBeenCalledWith(1);
    expect(mockPedido.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar pedido inexistente", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Pedido.findByPk as jest.Mock).mockResolvedValue(null);

    await PedidoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});