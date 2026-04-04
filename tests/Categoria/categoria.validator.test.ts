import { validate } from "../../src/middlewares/validate.middleware";
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from "../../src/validators/categoria.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Categoria - create", () => {
  const middleware = validate(createCategoriaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse deve falhar pois o nome é muito curto", async () => {
    const req = mockRequest({
      body: {
        nome: "a",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar pois o nome é muito longo", async () => {
    const req = mockRequest({
      body: {
        nome: "a".repeat(256),
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar caso a descrição seja muito longa", async () => {
    const req = mockRequest({
      body: {
        nome: "Valido",
        descricao: "a".repeat(2001),
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Categoria - update", () => {
  const middleware = validate(updateCategoriaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse deve falhar caso descrição seja muito longa", async () => {
    const req = mockRequest({
      body: {
        descricao: "a".repeat(2001),
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar pois o nome é muito longo", async () => {
    const req = mockRequest({
      body: {
        nome: "a".repeat(256),
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});