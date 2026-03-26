import EnderecoController from "../../src/controllers/endereco.controllers";
import Endereco from "../../src/models/Endereco";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Endereco");


describe("EnderecoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os endereços", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (Endereco.findAll as jest.Mock).mockResolvedValue([
      { id_endereco: 1 },
      { id_endereco: 2 },
    ]);

    await EnderecoController.findAll(req, res);

    expect(Endereco.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("EnderecoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um endereço pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockEndereco = { id_endereco: 1 };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.findById(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEndereco);
  });

  it("esse teste deve retornar erro 404 se não encontrar o endereço", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Endereco.findByPk as jest.Mock).mockResolvedValue(null);

    await EnderecoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("EnderecoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar endereço com sucesso", async () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        endereco: "Rua Teste",
        numero: "123",
        complemento: "Apto 1",
        bairro: "Centro",
        cidade: "Maringá",
        estado: "PR",
        cep: "12345678",
      },
    });

    const res = mockResponse();

    const mockEndereco = { id_endereco: 1, ...req.body };

    (Endereco.create as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.create(req, res);

    expect(Endereco.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEndereco);
  });
});

describe("EnderecoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar endereço com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        cidade: "Curitiba",
      },
    });

    const res = mockResponse();

    const mockEndereco = {
      update: jest.fn().mockResolvedValue(true),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.update(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(mockEndereco.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se endereço não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();

    (Endereco.findByPk as jest.Mock).mockResolvedValue(null);

    await EnderecoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("EnderecoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar endereço com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockEndereco = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.delete(req, res);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(mockEndereco.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar endereço inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Endereco.findByPk as jest.Mock).mockResolvedValue(null);

    await EnderecoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


