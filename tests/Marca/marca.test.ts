import MarcaController from "../../src/controllers/marca.controllers";
import Marca from "../../src/models/Marca";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Marca");

describe("MarcaController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todas as marcas corretamente", async () => {
    const req = mockRequest({ query: {} });
    const res = mockResponse();
    const next = jest.fn();

    const mockMarcas = [
      { id: 1, nome: "Nike" },
      { id: 2, nome: "Adidas" },
    ];

    (Marca.findAll as jest.Mock).mockResolvedValue(mockMarcas);

    await MarcaController.findAll(req, res, next);

    expect(Marca.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMarcas);
  });
});

describe("MarcaController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retonar uma marca procurada pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockMarca = {
      id: 1,
      nome: "Nike"
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.findById(req, res, next);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMarca);
  });

  it("esse teste deve retornar erro 404 caso não encontre a marca", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.findById(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("MarcaController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar marca com sucesso", async () => {
    const req = mockRequest({
      body: {
        nome: "Nike",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockMarca = { id: 1, ...req.body };

    (Marca.create as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.create(req, res, next);

    expect(Marca.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockMarca);
  });
});

describe("MarcaController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar marca com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Adidas",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockMarca = {
      id: 1,
      update: jest.fn().mockResolvedValue(true),
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.update(req, res, next);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);
    expect(mockMarca.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro 404 caso marca não exista", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Adidas",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.update(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("MarcaController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockMarca = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.delete(req, res, next);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);
    expect(mockMarca.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 caso não consiga dar o delete", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.delete(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});