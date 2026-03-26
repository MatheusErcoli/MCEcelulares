import { validate } from "../../src/middlewares/validate.middleware";
import {
  createProdutoSchema,
  updateProdutoSchema,
} from "../../src/validators/produto.validator";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Produto");

describe("Validacao de Produto - create", () => {
  const middleware = validate(createProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validacao", () => {
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

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse tem que falhar pois o nome e invalido", () => {
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

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse tem que falhar pois o preco e negativo", () => {
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

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso o estoque for negativo", () => {
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

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar caso estoque nao for um numero inteiro", () => {
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

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se id_marca nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10,
        id_categoria: 1,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse deve falhar se id_categoria nao for enviado", () => {
    const req = mockRequest({
      body: {
        nome: "Produto Teste",
        preco: 100,
        estoque: 10,
        id_marca: 1,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validacao de Produto - update", () => {
  const middleware = validate(updateProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste e de update parcial aceitando apenas um nome", () => {
    const req = mockRequest({
      body: {
        nome: "Novo nome",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar multiplos campos", () => {
    const req = mockRequest({
      body: {
        nome: "Produto Atualizado",
        preco: 200,
        estoque: 5,
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

  it("esse teste deve falhar caso preco for negativo", () => {
    const req = mockRequest({
      body: {
        preco: -10,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso estoque for negativo", () => {
    const req = mockRequest({
      body: {
        estoque: -1,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso estoque nao for inteiro", () => {
    const req = mockRequest({
      body: {
        estoque: 10.5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso a url da imagem for invalida", () => {
    const req = mockRequest({
      body: {
        imagem: "url-invalida",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso id_marca nao seja inteiro", () => {
    const req = mockRequest({
      body: {
        id_marca: 1.5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso id_categoria nao seja inteiro", () => {
    const req = mockRequest({
      body: {
        id_categoria: 2.5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
