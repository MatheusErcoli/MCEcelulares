import { validate } from "../../src/middlewares/validate.middleware";
import {
  createCarrinhoSchema,
  updateCarrinhoSchema,
} from "../../src/validators/carrinho.validator";


const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Carrinho - create", () => {
  const middleware = validate(createCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        ativo: true,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_usuario é inválido", () => {
    const req: any = {
      body: {
        id_usuario: "abc",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Carrinho - update", () => {
  const middleware = validate(updateCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req: any = {
      body: {
        ativo: false,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req: any = {
      body: {
        id_usuario: 2,
        ativo: true,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_usuario é inválido", () => {
    const req: any = {
      body: {
        id_usuario: "abc",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});