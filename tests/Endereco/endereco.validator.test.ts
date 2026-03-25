import { validate } from "../../src/middlewares/validate.middleware";
import {
  createEnderecoSchema,
  updateEnderecoSchema,
} from "../../src/validators/endereco.validator";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de Endereco - create", () => {
  const middleware = validate(createEnderecoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        endereco: "Rua Teste",
        numero: "123",
        cidade: "Maringá",
        estado: "PR",
        cep: "12345678",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois endereco é muito curto", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        endereco: "ab",
        numero: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois numero está vazio", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        endereco: "Rua Teste",
        numero: "",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois estado é inválido", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        endereco: "Rua Teste",
        numero: "123",
        estado: "PRR",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois cep é inválido", () => {
    const req: any = {
      body: {
        id_usuario: 1,
        endereco: "Rua Teste",
        numero: "123",
        cep: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de Endereco - update", () => {
  const middleware = validate(updateEnderecoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req: any = {
      body: {
        cidade: "Curitiba",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req: any = {
      body: {
        cidade: "Curitiba",
        estado: "PR",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois estado é inválido", () => {
    const req: any = {
      body: {
        estado: "PAR",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois cep é inválido", () => {
    const req: any = {
      body: {
        cep: "123",
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});