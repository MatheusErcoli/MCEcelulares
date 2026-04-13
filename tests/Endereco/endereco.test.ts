import EnderecoController from "../../src/controllers/endereco.controllers";
import Endereco from "../../src/models/Endereco";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Endereco");

describe("EnderecoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar os enderecos do usuario autenticado", async () => {
    const req = mockRequest({
      userId: 1,
      query: {},
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEnderecos = [
      { id_endereco: 1, id_usuario: 1, cidade: "Maringa" },
      { id_endereco: 2, id_usuario: 1, cidade: "Londrina" },
    ];

    (Endereco.findAll as jest.Mock).mockResolvedValue(mockEnderecos);

    await EnderecoController.findAll(req as any, res as any, next);

    expect(Endereco.findAll).toHaveBeenCalledWith({ where: { id_usuario: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEnderecos);
  });
});

describe("EnderecoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar um endereco com sucesso", async () => {
    const req = mockRequest({
      userId: 1,
      body: {
        endereco: "Rua das Flores",
        numero: "123",
        complemento: "Apto 1",
        bairro: "Centro",
        cidade: "Maringa",
        estado: "PR",
        cep: "87000-000",
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEndereco = {
      id_endereco: 1,
      id_usuario: 1,
      ...req.body,
    };

    (Endereco.create as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.create(req as any, res as any, next);

    expect(Endereco.create).toHaveBeenCalledWith({
      id_usuario: 1,
      ...req.body,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEndereco);
  });

  it("esse teste deve falhar ao criar um endereco", async () => {
    const req = mockRequest({
      userId: 1,
      body: {
        endereco: "Rua das Flores",
        numero: "123",
        cidade: "Maringa",
        estado: "PR",
        cep: "87000-000",
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    const erro = new Error("erro ao criar endereco");

    (Endereco.create as jest.Mock).mockRejectedValue(erro);

    await EnderecoController.create(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(erro);
  });
});

describe("EnderecoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar um endereco com sucesso", async () => {
    const req = mockRequest({
      userId: 1,
      params: { id: "1" },
      body: {
        numero: "456",
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEndereco = {
      id_endereco: 1,
      id_usuario: 1,
      numero: "123",
      update: jest.fn().mockResolvedValue(true),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.update(req as any, res as any, next);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(mockEndereco.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEndereco);
  });

  it("esse teste deve falhar ao atualizar um endereco de outro usuario", async () => {
    const req = mockRequest({
      userId: 1,
      params: { id: "1" },
      body: {
        numero: "456",
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEndereco = {
      id_endereco: 1,
      id_usuario: 2,
      update: jest.fn(),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.update(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(mockEndereco.update).not.toHaveBeenCalled();
  });
});

describe("EnderecoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar um endereco com sucesso", async () => {
    const req = mockRequest({
      userId: 1,
      params: { id: "1" },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEndereco = {
      id_endereco: 1,
      id_usuario: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.delete(req as any, res as any, next);

    expect(Endereco.findByPk).toHaveBeenCalledWith(1);
    expect(mockEndereco.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve falhar ao deletar um endereco de outro usuario", async () => {
    const req = mockRequest({
      userId: 1,
      params: { id: "1" },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockEndereco = {
      id_endereco: 1,
      id_usuario: 2,
      destroy: jest.fn(),
    };

    (Endereco.findByPk as jest.Mock).mockResolvedValue(mockEndereco);

    await EnderecoController.delete(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(mockEndereco.destroy).not.toHaveBeenCalled();
  });
});
