import { validate } from "../../src/middlewares/validate.middleware";
import {
  createPedidoSchema,
  updatePedidoSchema,
} from "../../src/validators/pedido.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Pedido - create", () => {
  const middleware = validate(createPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", async () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        id_endereco: 2,
        valor_total: 100,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois id_endereco é inválido", async () => {
    const req = mockRequest({
      body: {
        id_endereco: -1,
        valor_total: 100,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois valor_total é negativo", async () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        id_endereco: 2,
        valor_total: -5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Pedido - update", () => {
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

  it("esse teste deve aceitar múltiplos campos válidos", async () => {
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

  it("esse teste deve falhar pois valor_total é negativo", async () => {
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