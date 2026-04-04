import { validate } from "../../src/middlewares/validate.middleware";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
} from "../../src/validators/usuario.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Usuario - create", () => {
  const middleware = validate(createUsuarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", async () => {
    const req = mockRequest({
      body: {
        nome: "Matheus",
        email: "matheus@email.com",
        senha: "Senha@123",
        cpf: "12345678900",
        telefone: "44999999999",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois o nome é muito curto", async () => {
    const req = mockRequest({
      body: {
        nome: "ab",
        email: "teste@email.com",
        senha: "Senha@123",
        cpf: "12345678900",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois o email é inválido", async () => {
    const req = mockRequest({
      body: {
        nome: "Matheus",
        email: "emailinvalido",
        senha: "Senha@123",
        cpf: "12345678900",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois a senha não tem letra maiúscula e caractere especial", async () => {
    const req = mockRequest({
      body: {
        nome: "Matheus",
        email: "teste@email.com",
        senha: "senhafraca123",
        cpf: "12345678900",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois o cpf é inválido", async () => {
    const req = mockRequest({
      body: {
        nome: "Matheus",
        email: "teste@email.com",
        senha: "Senha@123",
        cpf: "123",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Usuario - update", () => {
  const middleware = validate(updateUsuarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial com apenas nome", async () => {
    const req = mockRequest({
      body: {
        nome: "Novo Nome",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve aceitar múltiplos campos válidos", async () => {
    const req = mockRequest({
      body: {
        nome: "Novo Nome",
        senha: "NovaSenha@321",
        cpf: "12345678900",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois a senha é inválida", async () => {
    const req = mockRequest({
      body: {
        senha: "123",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois o cpf é inválido", async () => {
    const req = mockRequest({
      body: {
        cpf: "123",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});