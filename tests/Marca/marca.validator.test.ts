import { validate } from "../../src/middlewares/validate.middleware";
import { createMarcaSchema, updateMarcaSchema } from "../../src/validators/marca.validator";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Marca - create", () => {
  const middleware = validate(createMarcaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação", () => {
    const req: any = {
      body: {
        nome: "Nike",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar pois o nome é muito curto", () => {
    const req: any = {
      body: {
        nome: "a",
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
});

describe("Validação de Marca - update", () => {
  const middleware = validate(updateMarcaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update", () => {
    const req: any = {
      body: {
        nome: "Adidas",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar caso o nome seja inválido", () => {
    const req: any = {
      body: {
        nome: "a",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});