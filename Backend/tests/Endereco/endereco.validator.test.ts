import { validate } from "../../src/middlewares/validate.middleware";
import {
  createEnderecoSchema,
  updateEnderecoSchema,
} from "../../src/validators/endereco.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Endereco - create", () => {
  const middleware = validate(createEnderecoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois endereco é muito curto", async () => {
    const req = mockRequest({
      body: {
        endereco: "a",
        numero: "123",
        estado: "SP",
        cep: "12345-678",
        cidade: "Cidade",
        bairro: "Bairro",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois numero está vazio", async () => {
    const req = mockRequest({
      body: {
        endereco: "Rua Valida",
        numero: "",
        estado: "SP",
        cep: "12345-678",
        cidade: "Cidade",
        bairro: "Bairro",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois estado é inválido", async () => {
    const req = mockRequest({
      body: {
        endereco: "Rua Valida",
        numero: "123",
        estado: "Invalido",
        cep: "12345-678",
        cidade: "Cidade",
        bairro: "Bairro",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois cep é inválido", async () => {
    const req = mockRequest({
      body: {
        endereco: "Rua Valida",
        numero: "123",
        estado: "SP",
        cep: "123",
        cidade: "Cidade",
        bairro: "Bairro",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Endereco - update", () => {
  const middleware = validate(updateEnderecoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois estado é inválido", async () => {
    const req = mockRequest({
      body: {
        estado: "Invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois cep é inválido", async () => {
    const req = mockRequest({
      body: {
        cep: "123",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});