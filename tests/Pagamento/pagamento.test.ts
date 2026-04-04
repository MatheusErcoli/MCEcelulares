import PagamentoController from "../../src/controllers/pagamento.controllers";
import Pagamento from "../../src/models/Pagamento";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Pagamento");

describe("PagamentoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os pagamentos", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    (Pagamento.findAll as jest.Mock).mockResolvedValue([
      { id_pagamento: 1 },
      { id_pagamento: 2 },
    ]);

    await PagamentoController.findAll(req, res, next);

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
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockPagamento = { id_pagamento: 1 };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.findById(req, res, next);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPagamento);
  });

  it("esse teste deve retornar erro 404 caso não encontre o pagamento", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.findById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("PagamentoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar pagamento com sucesso", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        metodo_pagamento: "PIX",
        valor: 100,
        status: "PAGO",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockPagamento = { id_pagamento: 1, ...req.body };

    (Pagamento.create as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.create(req, res, next);

    expect(Pagamento.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockPagamento);
  });
});

describe("PagamentoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        valor: 200,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockPagamento = {
      id_pagamento: 1,
      update: jest.fn().mockResolvedValue(true),
    };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.update(req, res, next);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1);
    expect(mockPagamento.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se pagamento não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        valor: 200,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.update(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("PagamentoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar pagamento com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockPagamento = {
      id_pagamento: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(mockPagamento);

    await PagamentoController.delete(req, res, next);

    expect(Pagamento.findByPk).toHaveBeenCalledWith(1);
    expect(mockPagamento.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar pagamento inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Pagamento.findByPk as jest.Mock).mockResolvedValue(null);

    await PagamentoController.delete(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});