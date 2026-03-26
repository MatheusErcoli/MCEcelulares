import { validate } from "../../src/middlewares/validate.middleware";
import { createCategoriaSchema, updateCategoriaSchema } from "../../src/validators/categoria.validator";
import { mockRequest, mockResponse } from "../test.helpers";


describe("Validação de Categoria - create", () => {
  const middleware = validate(createCategoriaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação", () => {
    const req = mockRequest({
      body: {
        nome: "Eletrônicos",
        descricao: "Produtos eletrônicos",
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar pois o nome é muito curto", () => {
    const req = mockRequest({
      body: {
        nome: "ab",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar pois o nome é muito longo", () => {
    const req = mockRequest({
      body: {
        nome: "a".repeat(101),
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso a descrição seja muito longa", () => {
    const req = mockRequest({
      body: {
        nome: "Eletrônicos",
        descricao: "a".repeat(256),
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso ativo não seja booleano", () => {
    const req = mockRequest({
      body: {
        nome: "Eletrônicos",
        ativo: "true",
      },
    });

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
    const req = mockRequest({
      body: {
        nome: "Nova Categoria",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos", () => {
    const req = mockRequest({
      body: {
        nome: "Atualizado",
        descricao: "Nova descrição",
        ativo: false,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar body vazio", () => {
    const req = mockRequest({
      body: {},
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar caso descrição seja muito longa", () => {
    const req = mockRequest({
      body: {
        descricao: "a".repeat(256),
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso ativo não seja booleano", () => {
    const req = mockRequest({
      body: {
        ativo: "false",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


