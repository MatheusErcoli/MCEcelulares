import { validate } from "../../src/middlewares/validate.middleware";
import {
  createUsuarioSchema,
  updateUsuarioSchema,
} from "../../src/validators/usuario.validator";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Usuario - create", () => {
  const middleware = validate(createUsuarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req: any = {
      body: {
        nome: "Matheus",
        email: "matheus@email.com",
        senha: "Senha@123",
        cpf: "12345678900",
        telefone: "44999999999",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois o nome é muito curto", () => {
    const req: any = {
      body: {
        nome: "ab",
        email: "teste@email.com",
        senha: "Senha@123",
        cpf: "12345678900",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois o email é inválido", () => {
    const req: any = {
      body: {
        nome: "Teste",
        email: "email-invalido",
        senha: "Senha@123",
        cpf: "12345678900",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois a senha não atende os requisitos", () => {
    const req: any = {
      body: {
        nome: "Teste",
        email: "teste@email.com",
        senha: "123",
        cpf: "12345678900",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois o cpf é inválido", () => {
    const req: any = {
      body: {
        nome: "Teste",
        email: "teste@email.com",
        senha: "Senha@123",
        cpf: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois o telefone é inválido", () => {
    const req: any = {
      body: {
        nome: "Teste",
        email: "teste@email.com",
        senha: "Senha@123",
        cpf: "12345678900",
        telefone: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Usuario - update", () => {
  const middleware = validate(updateUsuarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial com apenas nome", () => {
    const req: any = {
      body: {
        nome: "Novo Nome",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req: any = {
      body: {
        nome: "Novo Nome",
        senha: "Senha@123",
        cpf: "12345678900",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois a senha é inválida", () => {
    const req: any = {
      body: {
        senha: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois o cpf é inválido", () => {
    const req: any = {
      body: {
        cpf: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois o telefone é inválido", () => {
    const req: any = {
      body: {
        telefone: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});