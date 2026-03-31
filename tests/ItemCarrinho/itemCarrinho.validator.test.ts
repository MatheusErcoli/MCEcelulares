import { validate } from "../../src/middlewares/validate.middleware";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../../src/validators/itemCarrinho.validator";
import { mockRequest, mockResponse } from "../test.helpers";


describe("Validação de ItemCarrinho - create", () => {
  const middleware = validate(createItemCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 3,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_carrinho é inválido", () => {
    const req = mockRequest({
      body: {
        id_carrinho: -1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 3,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 0,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: -10,
        quantidade: 3,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de ItemCarrinho - update", () => {
  const middleware = validate(updateItemCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req = mockRequest({
      body: {
        quantidade: 5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req = mockRequest({
      body: {
        quantidade: 5,
        preco_unitario: 100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req = mockRequest({
      body: {
        quantidade: 1.1,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req = mockRequest({
      body: {
        preco_unitario: -5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


