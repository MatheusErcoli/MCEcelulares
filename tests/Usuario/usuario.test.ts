import UsuarioController from "../../src/controllers/usuario.controllers";
import Usuario from "../../src/models/Usuario";
import bcrypt from "bcrypt";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Usuario");
jest.mock("bcrypt");


describe("UsuarioController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar usuários com paginação", async () => {
    const req = mockRequest({
      query: { page: "1", limit: "10" },
    });
    const res = mockResponse();

    (Usuario.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [
        { id_usuario: 1, nome: "Usuário 1" },
        { id_usuario: 2, nome: "Usuário 2" },
      ],
    });

    await UsuarioController.findAll(req, res);

    expect(Usuario.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({
        limit: 10,
        offset: 0,
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        data: expect.any(Array),
      })
    );
  });

  it("deve retornar erro se página inválida", async () => {
    const req = mockRequest({
      query: { page: "-1" },
    });
    const res = mockResponse();

    await UsuarioController.findAll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Página inválida",
    });
  });
});

describe("UsuarioController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar usuário pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
    const res = mockResponse();

    const mockUsuario = {
      id_usuario: 1,
      nome: "Teste",
      enderecos: [],
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.findById(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1, {
      attributes: { exclude: ["senha"] },
      include: ["enderecos"],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsuario);
  });

  it("deve retornar 404 se não encontrar usuário", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
    const res = mockResponse();

    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await UsuarioController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário não encontrado",
    });
  });
});

describe("UsuarioController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar usuário com sucesso", async () => {
    const req = mockRequest({
      body: {
        nome: "Teste",
        email: "teste@email.com",
        senha: "123456",
        cpf: "12345678900",
        telefone: "999999999",
      },
    });

    const res = mockResponse();

    (bcrypt.hash as jest.Mock).mockResolvedValue("senhaHash");

    const mockUsuario = {
      id_usuario: 1,
      ...req.body,
      senha: "senhaHash",
      toJSON: jest.fn().mockReturnValue({
        id_usuario: 1,
        nome: "Teste",
        email: "teste@email.com",
        cpf: "12345678900",
        telefone: "999999999",
      }),
    };

    (Usuario.create as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.create(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
    expect(Usuario.create).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.not.objectContaining({
        senha: expect.anything(),
      })
    );
  });
});

describe("UsuarioController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar usuário com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    });

    const res = mockResponse();

    const mockUsuario = {
      id_usuario: 1,
      nome: "Antigo",
      update: jest.fn().mockResolvedValue(true),
      toJSON: jest.fn().mockReturnValue({
        id_usuario: 1,
        nome: "Atualizado",
      }),
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.update(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(mockUsuario.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("deve retornar erro se usuário não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();

    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await UsuarioController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário não encontrado",
    });
  });

  it("deve retornar erro se tentar alterar email", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        email: "novo@email.com",
      },
    });

    const res = mockResponse();

    const mockUsuario = {
      update: jest.fn(),
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email não pode ser alterado",
    });
  });
});

describe("UsuarioController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve deletar usuário com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockUsuario = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.delete(req, res);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(mockUsuario.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("deve retornar erro 404 ao deletar usuário inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await UsuarioController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuário não encontrado",
    });
  });
});


