import { validate } from "../../src/middlewares/validate.middleware";
import {
  createItemCarrinhoSchema,
  updateItemCarrinhoSchema,
} from "../../src/validators/itemCarrinho.validator";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de ItemCarrinho - create", () => {
  const middleware = validate(createItemCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req: any = {
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 3,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_carrinho é inválido", () => {
    const req: any = {
      body: {
        id_carrinho: -1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 3,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req: any = {
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: 50,
        quantidade: 0,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req: any = {
      body: {
        id_carrinho: 1,
        id_produto: 2,
        preco_unitario: -10,
        quantidade: 3,
      },
    };

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
    const req: any = {
      body: {
        quantidade: 5,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req: any = {
      body: {
        quantidade: 5,
        preco_unitario: 100,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req: any = {
      body: {
        quantidade: 0,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req: any = {
      body: {
        preco_unitario: -5,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});