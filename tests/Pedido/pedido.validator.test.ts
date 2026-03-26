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

  it("esse teste deve passar a validação com dados válidos", () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        id_funcionario: 2,
        valor_total: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_usuario é inválido", () => {
    const req = mockRequest({
      body: {
        id_usuario: -1,
        valor_total: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois valor_total é negativo", () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        valor_total: -10,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Pedido - update", () => {
  const middleware = validate(updatePedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req = mockRequest({
      body: {
        valor_total: 200,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req = mockRequest({
      body: {
        valor_total: 200,
        status: "PAGO",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois valor_total é negativo", () => {
    const req = mockRequest({
      body: {
        valor_total: -5,
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


