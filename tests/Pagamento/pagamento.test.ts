import PagamentoController from "../../src/controllers/pagamento.controllers";
import Pagamento from "../../src/models/Pagamento";

jest.mock("../../src/models/Pagamento");

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("PagamentoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os pagamentos", async () => {
    const req: any = {};
    const res = mockResponse();

    (Pagamento.findAll as jest.Mock).mockResolvedValue([
      { id_pagamento: 1 },
      { id_pagamento: 2 },
    ]);

    await PagamentoController.findAll(req, res);

    expect(Pagamento.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("PagamentoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um pagamento pelo ID", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockPagamento = { id_pagamento: 1 };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.findById(req, res);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPagamento);
  });

  it("esse teste deve retornar erro 404 se não encontrar pagamento", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("PagamentoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar pagamento com sucesso", async () => {
    const req: any = {
      body: {
        id_pedido: 1,
        metodo_pagamento: "PIX",
        valor: 100,
      },
    };

    const res = mockResponse();

    const mockPagamento = { id_pagamento: 1, ...req.body };

    (Pagamento.create as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.create(req, res);

    expect(Pagamento.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPagamento);
  });
});

describe("PagamentoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar pagamento com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        valor: 200,
      },
    };

    const res = mockResponse();

    const mockPagamento = {
      update: jest.fn().mockResolvedValue(true),
    };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.update(req, res);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1);
    expect(mockPagamento.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se pagamento não existir", async () => {
    const req: any = {
      params: { id: "1" },
      body: {},
    };

    const res = mockResponse();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("PagamentoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar pagamento com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockPagamento = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.delete(req, res);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1);
    expect(mockPagamento.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar pagamento inexistente", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});