import CategoriaController from "../../src/controllers/categoria.controllers";
import Categoria from "../../src/models/Categoria";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Categoria");

describe("CategoriaController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todas as categorias corretamente", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    const mockCategorias = [
      { id_categoria: 1, nome: "Eletrônicos" },
      { id_categoria: 2, nome: "Roupas" },
    ];

    (Categoria.findAll as jest.Mock).mockResolvedValue(mockCategorias);

    await CategoriaController.findAll(req, res, next);

    expect(Categoria.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategorias);
  });
});

describe("CategoriaController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma categoria pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCategoria = {
      id_categoria: 1,
      nome: "Eletrônicos",
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.findById(req, res, next);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategoria);
  });

  it("deve chamar o next com erro se categoria não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.findById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("CategoriaController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para criar uma categoria com sucesso", async () => {
    const req = mockRequest({
      body: {
        nome: "Eletrônicos",
        descricao: "Produtos eletrônicos",
        ativo: true,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCategoriaCriada = {
      id_categoria: 1,
      ...req.body,
    };

    (Categoria.create as jest.Mock).mockResolvedValue(mockCategoriaCriada);

    await CategoriaController.create(req, res, next);

    expect(Categoria.create).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCategoriaCriada);
  });
});

describe("CategoriaController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar a categoria com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCategoria = {
      id_categoria: 1,
      nome: "Antigo",
      update: jest.fn().mockResolvedValue(true),
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.update(req, res, next);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(mockCategoria.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategoria);
  });

  it("esse teste deve chamar o next com erro caso a categoria não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.update(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("CategoriaController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCategoria = {
      id_categoria: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.delete(req, res, next);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(mockCategoria.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve chamar o next com erro caso não consiga dar o delete", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.delete(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});