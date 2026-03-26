import { validate } from "../../src/middlewares/validate.middleware";
import { createProdutoSchema, updateProdutoSchema } from "../../src/validators/produto.validator";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Produto");

//simula o res para testar os métodos

describe("Validação de Produto - create", () => {
  const middleware = validate(createProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação", () => {
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

  it("esse tem que falhar pois o nome é inválido", () => {
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

  it("esse tem que falhar pois o preço é negativo", () => {
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

  it("esse deve falhar caso estoque não for um número inteiro", () => {
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
});

describe("Validação de Produto - update", () => {
  const middleware = validate(updateProdutoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é de update parcial aceitando apenas um nome", () => {
    const req = mockRequest({
      body: {
        nome: "Novo nome",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar multíplos campos", () => {
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

  it("esse teste deve falhar caso preço for negativo", () => {
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

  it("esse teste deve falhar caso estoque não for inteiro", () => {
    const req = mockRequest({
      body: {
        estoque: 10.5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso a url da imagem for inválida", () => {
    const req = mockRequest({
      body: {
        imagem: "url-invalida",
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso id_marca não seja inteiro", () => {
    const req = mockRequest({
      body: {
        id_marca: 1.5,
      },
    });

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar caso id_categoria não seja inteiro", () => {
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


