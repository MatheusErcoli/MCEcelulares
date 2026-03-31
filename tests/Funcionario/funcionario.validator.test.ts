import { validate } from "../../src/middlewares/validate.middleware";
import {
  createFuncionarioSchema,
  updateFuncionarioSchema,
} from "../../src/validators/funcionario.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validacao de Funcionario - create", () => {
  const middleware = validate(createFuncionarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validacao", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "joao@email.com",
        telefone: "12345678999",
        cargo: "Vendedor",
        salario: 2000,
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar pois o nome e muito curto", () => {
    const req = mockRequest({
      body: {
        nome: "Jo",
        email: "teste@email.com",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se telefone nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        cargo: "Vendedor",
        salario: 2000,
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se cargo nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        telefone: "12345678",
        salario: 2000,
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se salario nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        telefone: "12345678",
        cargo: "Vendedor",
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se ativo nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        telefone: "12345678",
        cargo: "Vendedor",
        salario: 2000,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar pois o email e invalido", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "email-invalido",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso telefone seja muito curto", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        telefone: "123",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso cargo seja muito curto", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        cargo: "A",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso salario seja negativo", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        salario: -100,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve aceitar data_admissao como string (coerce)", () => {
    const req = mockRequest({
      body: {
        nome: "Joao Silva",
        email: "teste@email.com",
        telefone: "12345678",
        cargo: "Vendedor",
        data_admissao: "2024-01-01",
        salario: 2000,
        ativo: true,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe("Validacao de Funcionario - update", () => {
  const middleware = validate(updateFuncionarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req = mockRequest({
      body: {
        nome: "Novo Nome",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar multiplos campos", () => {
    const req = mockRequest({
      body: {
        nome: "Atualizado",
        email: "novo@email.com",
        salario: 3000,
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

  it("esse deve falhar caso email seja invalido", () => {
    const req = mockRequest({
      body: {
        email: "email-invalido",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso salario seja negativo", () => {
    const req = mockRequest({
      body: {
        salario: -500,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso telefone seja curto", () => {
    const req = mockRequest({
      body: {
        telefone: "123",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
