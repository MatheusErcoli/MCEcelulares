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

  it("esse teste deve passar a validação com dados válidos", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois id_carrinho é inválido", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: "invalido",
        id_produto: 2,
        preco_unitario: 50,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois preco_unitario é inválido", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de ItemCarrinho - update", () => {
  const middleware = validate(updateItemCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", async () => {
    const req = mockRequest({
      body: {
        quantidade: 5,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois quantidade é inválida", async () => {
    const req = mockRequest({
      body: {
        quantidade: "invalida",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});