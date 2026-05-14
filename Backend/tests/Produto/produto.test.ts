import { validate } from "../../src/middlewares/validate.middleware";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../../src/validators/produto.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validacao de Produto - create", () => {
  const middleware = validate(createProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validacao", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10,
        id_marca: 1,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse tem que falhar pois o nome e invalido", async () => {
    const req = mockRequest({
      body: {
        nome: "ab",
        preco: 100,
        estoque: 10,
        id_marca: 1,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse tem que falhar pois o preco e negativo", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: -10,
        estoque: 10,
        id_marca: 1,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar caso o estoque for negativo", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: -1,
        id_marca: 1,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar caso estoque nao for um numero inteiro", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10.5,
        id_marca: 1,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar se id_marca nao for enviado", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar se id_categoria nao for enviado", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10,
        id_marca: 1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validacao de Produto - update", () => {
  const middleware = validate(updateProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste e de update parcial aceitando apenas um nome", async () => {
    const req = mockRequest({
      body: {
        nome: "Novo nome",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve aceitar multiplos campos", async () => {
    const req = mockRequest({
      body: {
        nome: "Produto Atualizado",
        preco: 200,
        estoque: 5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso preco for negativo", async () => {
    const req = mockRequest({
      body: {
        preco: -10,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso estoque for negativo", async () => {
    const req = mockRequest({
      body: {
        estoque: -1,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso estoque nao for inteiro", async () => {
    const req = mockRequest({
      body: {
        estoque: 10.5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso a url da imagem for invalida", async () => {
    const req = mockRequest({
      body: {
        imagem: "url-invalida",
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso id_marca nao seja inteiro", async () => {
    const req = mockRequest({
      body: {
        id_marca: 1.5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar caso id_categoria nao seja inteiro", async () => {
    const req = mockRequest({
      body: {
        id_categoria: 2.5,
      },
    });

    const res = mockResponse();

    await middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});