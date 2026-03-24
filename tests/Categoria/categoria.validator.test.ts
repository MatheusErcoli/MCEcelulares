import { validate } from "../../src/middlewares/validate.middleware";
import { createCategoriaSchema, updateCategoriaSchema } from "../../src/validators/categoria.validator";

//simula o res para testar os métodos
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Categoria - create", () => {
  const middleware = validate(createCategoriaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação", () => {
    const req: any = {
      body: {
        nome: "Eletrônicos",
        descricao: "Produtos eletrônicos",
        ativo: true,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar pois o nome é muito curto", () => {
    const req: any = {
      body: {
        nome: "ab",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar pois o nome é muito longo", () => {
    const req: any = {
      body: {
        nome: "a".repeat(101),
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso a descrição seja muito longa", () => {
    const req: any = {
      body: {
        nome: "Eletrônicos",
        descricao: "a".repeat(256),
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso ativo não seja booleano", () => {
    const req: any = {
      body: {
        nome: "Eletrônicos",
        ativo: "true",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Categoria - update", () => {
  const middleware = validate(updateCategoriaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req: any = {
      body: {
        nome: "Nova Categoria",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos", () => {
    const req: any = {
      body: {
        nome: "Atualizado",
        descricao: "Nova descrição",
        ativo: false,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar body vazio", () => {
    const req: any = {
      body: {},
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar caso descrição seja muito longa", () => {
    const req: any = {
      body: {
        descricao: "a".repeat(256),
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso ativo não seja booleano", () => {
    const req: any = {
      body: {
        ativo: "false",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});