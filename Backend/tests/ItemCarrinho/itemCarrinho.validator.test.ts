import { validate } from "../../src/middlewares/validate.middleware";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../../src/validators/itemCarrinho.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validacao de ItemCarrinho - create", () => {
  const middleware = validate(createItemCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validacao com dados validos", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        quantidade: 1,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois id_carrinho e invalido", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: "invalido",
        id_produto: 2,
        quantidade: 1,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois quantidade e invalida", async () => {
    const req = mockRequest({
      body: {
        id_carrinho: 1,
        id_produto: 2,
        quantidade: "invalida",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validacao de ItemCarrinho - update", () => {
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

  it("esse teste deve falhar pois quantidade e invalida", async () => {
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
