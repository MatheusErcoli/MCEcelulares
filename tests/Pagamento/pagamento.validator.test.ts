import { validate } from "../../src/middlewares/validate.middleware";
import {
  createPagamentoSchema,
  updatePagamentoSchema,
} from "../../src/validators/pagamento.validator";
import { mockRequest, mockResponse } from "../test.helpers";


describe("Validação de Pagamento - create", () => {
  const middleware = validate(createPagamentoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        metodo_pagamento: "PIX",
        valor: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_pedido é inválido", () => {
    const req = mockRequest({
      body: {
        id_pedido: -1,
        metodo_pagamento: "PIX",
        valor: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois valor é inválido", () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        metodo_pagamento: "PIX",
        valor: -10,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois método de pagamento é vazio", () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        metodo_pagamento: "",
        valor: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Pagamento - update", () => {
  const middleware = validate(updatePagamentoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req = mockRequest({
      body: {
        valor: 200,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req = mockRequest({
      body: {
        valor: 200,
        status: "PAGO",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois valor é inválido", () => {
    const req = mockRequest({
      body: {
        valor: -5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois status é inválido", () => {
    const req = mockRequest({
      body: {
        status: "INVALIDO",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


