import FuncionarioController from "../../src/controllers/funcionario.controllers";
import Funcionario from "../../src/models/Funcionario";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Funcionario");

describe("FuncionarioController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar validacao corretamente", async () => {
    const req = mockRequest({
      query: { page: "1", limit: "10" },
    });

    const res = mockResponse();

    (Funcionario.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [
        { id_funcionario: 1, nome: "Joao" },
        { id_funcionario: 2, nome: "Maria" },
      ],
    });

    await FuncionarioController.findAll(req, res);

    expect(Funcionario.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 10,
        offset: 0,
        order: [["id_funcionario", "ASC"]],
      }),
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        data: expect.any(Array),
      }),
    );
  });

  it("esse teste retorna erro caso a paginacao esteja errada", async () => {
    const req = mockRequest({
      query: { page: "-1" },
    });

    const res = mockResponse();

    await FuncionarioController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Página inválida",
    });
  });
});

describe("FuncionarioController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar um funcionario pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockFuncionario = {
      id_funcionario: 1,
      nome: "Joao",
    };

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(mockFuncionario);

    await FuncionarioController.findById(req, res);

    expect(Funcionario.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFuncionario);
  });

  it("deve retornar 404 se funcionario nao existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(null);

    await FuncionarioController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Funcionário não encontrado",
    });
  });
});

describe("FuncionarioController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste e para criar um funcionario com sucesso", async () => {
    const req = mockRequest({
      body: {
        nome: "Joao",
        email: "joao@email.com",
        telefone: "123456789",
        cargo: "Vendedor",
        data_admissao: new Date(),
        salario: 2000,
        ativo: true,
      },
    });

    const res = mockResponse();

    const mockFuncionario = {
      id_funcionario: 1,
      ...req.body,
    };

    (Funcionario.create as jest.Mock).mockResolvedValue(mockFuncionario);

    await FuncionarioController.create(req, res);

    expect(Funcionario.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFuncionario);
  });
});

describe("FuncionarioController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar o funcionario com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Joao Atualizado",
      },
    });

    const res = mockResponse();

    const mockFuncionario = {
      id_funcionario: 1,
      nome: "Joao",
      update: jest.fn().mockResolvedValue(true),
    };

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(mockFuncionario);

    await FuncionarioController.update(req, res);

    expect(Funcionario.findByPk).toHaveBeenCalledWith(1);
    expect(mockFuncionario.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFuncionario);
  });

  it("esse teste deve retornar erro caso o funcionario nao existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    });

    const res = mockResponse();

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(null);

    await FuncionarioController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Funcionário não encontrado",
    });
  });
});

describe("FuncionarioController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste e para deletar com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockFuncionario = {
      id_funcionario: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(mockFuncionario);

    await FuncionarioController.delete(req, res);

    expect(Funcionario.findByPk).toHaveBeenCalledWith(1);
    expect(mockFuncionario.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 caso nao consiga dar o delete", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Funcionario.findByPk as jest.Mock).mockResolvedValue(null);

    await FuncionarioController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Funcionário não encontrado",
    });
  });
});
