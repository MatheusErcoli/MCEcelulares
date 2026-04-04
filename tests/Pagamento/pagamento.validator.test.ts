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

  it("esse teste deve falhar pois id_pedido é inválido", async () => {
    const req = mockRequest({
      body: {
        id_pedido: "invalido",
        valor: 100,
        metodo_pagamento: "PIX",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois valor é inválido", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        valor: "invalido",
        metodo_pagamento: "PIX",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois método de pagamento é vazio", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        valor: 100,
        metodo_pagamento: "",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Pagamento - update", () => {
  const middleware = validate(updatePagamentoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois valor é inválido", async () => {
    const req = mockRequest({
      body: {
        valor: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois status é inválido", async () => {
    const req = mockRequest({
      body: {
        status: "STATUS_INVALIDO",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});