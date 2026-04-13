import { validate } from "../../src/middlewares/validate.middleware";
import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../../src/validators/pedido.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validacao de Pedido - create", () => {
  const middleware = validate(createPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validacao com dados validos", async () => {
    const req = mockRequest({
      body: {
        id_endereco: 2,
        data: "2026-04-13",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois id_endereco e invalido", async () => {
    const req = mockRequest({
      body: {
        id_endereco: -1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois data e invalida", async () => {
    const req = mockRequest({
      body: {
        id_endereco: 2,
        data: "data-invalida",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validacao de Pedido - update", () => {
  const middleware = validate(updatePedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", async () => {
    const req = mockRequest({
      body: {
        valor_total: 200,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve aceitar multiplos campos validos", async () => {
    const req = mockRequest({
      body: {
        valor_total: 200,
        status: "PAGO",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois valor_total e negativo", async () => {
    const req = mockRequest({
      body: {
        valor_total: -5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});
