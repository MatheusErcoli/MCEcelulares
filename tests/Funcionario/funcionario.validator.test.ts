import { validate } from "../../src/middlewares/validate.middleware";
import { createFuncionarioSchema, updateFuncionarioSchema } from "../../src/validators/funcionario.validator";

//simula o res para testar os métodos
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Funcionário - create", () => {
  const middleware = validate(createFuncionarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "joao@email.com",
        telefone: "12345678",
        cargo: "Vendedor",
        salario: 2000,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve falhar pois o nome é muito curto", () => {
    const req: any = {
      body: {
        nome: "Jo",
        email: "teste@email.com",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar pois o email é inválido", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "email-invalido",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso telefone seja muito curto", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "teste@email.com",
        telefone: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso cargo seja muito curto", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "teste@email.com",
        cargo: "A",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso salario seja negativo", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "teste@email.com",
        salario: -100,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve aceitar id_pedido como string (coerce)", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "teste@email.com",
        id_pedido: "1",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse deve aceitar data_admissao como string (coerce)", () => {
    const req: any = {
      body: {
        nome: "João Silva",
        email: "teste@email.com",
        data_admissao: "2024-01-01",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

describe("Validação de Funcionário - update", () => {
  const middleware = validate(updateFuncionarioSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req: any = {
      body: {
        nome: "Novo Nome",
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
        email: "novo@email.com",
        salario: 3000,
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

  it("esse deve falhar caso email seja inválido", () => {
    const req: any = {
      body: {
        email: "email-invalido",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso salario seja negativo", () => {
    const req: any = {
      body: {
        salario: -500,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso telefone seja curto", () => {
    const req: any = {
      body: {
        telefone: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve aceitar id_pedido como string (coerce)", () => {
    const req: any = {
      body: {
        id_pedido: "2",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});