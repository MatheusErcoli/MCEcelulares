import UsuarioController from "../../src/controllers/usuario.controllers";
import Usuario from "../../src/models/Usuario";
import bcrypt from "bcrypt";
import { mockRequest, mockResponse } from "../test.helpers";
import { HttpError } from "../../src/types/http_error";

jest.mock("../../src/models/Usuario");
jest.mock("bcrypt");

describe("UsuarioController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar usuários com paginação", async () => {
    const req = mockRequest({
      query: { page: "1", limit: "10" },
    });
    const res = mockResponse();
    const next = jest.fn();

    (Usuario.findAndCountAll as jest.Mock).mockResolvedValue({
      count: 2,
      rows: [
        { id_usuario: 1, nome: "Usuário 1" },
        { id_usuario: 2, nome: "Usuário 2" },
      ],
    });

    await UsuarioController.findAll(req as any, res as any, next);

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
});

describe("UsuarioController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um usuário procurado pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
    const res = mockResponse();
    const next = jest.fn();

    const mockUsuario = {
      id_usuario: 1,
      nome: "Usuário Teste",
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.findById(req as any, res as any, next);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1, {
      attributes: { exclude: ["senha"] },
      include: ["enderecos"],
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsuario);
  });

  it("esse teste deve chamar next com erro 404 caso não ache o usuário", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });
    const res = mockResponse();
    const next = jest.fn();

    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await UsuarioController.findById(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
  });
});

describe("UsuarioController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para criar um usuário com sucesso", async () => {
    const req = mockRequest({
      body: {
        nome: "Novo Usuário",
        email: "teste@teste.com",
        senha: "SenhaForte@123",
        cpf: "123.456.789-00",
        telefone: "44999999999",
        ativo: true,
        admin: false,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");

    const mockUsuarioCriado = {
      id_usuario: 1,
      ...req.body,
      senha: "hashed_password",
      toJSON: jest.fn().mockReturnValue({
        id_usuario: 1,
        nome: "Novo Usuário",
        email: "teste@teste.com",
        senha: "hashed_password",
      }),
    };

    (Usuario.create as jest.Mock).mockResolvedValue(mockUsuarioCriado);

    await UsuarioController.create(req as any, res as any, next);

    expect(bcrypt.hash).toHaveBeenCalledWith("SenhaForte@123", 10);
    expect(Usuario.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuário criado com sucesso" });
  });
});

describe("UsuarioController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar o usuário com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        nome: "Usuário Atualizado",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockUsuario = {
      id_usuario: 1,
      nome: "Usuário Antigo",
      update: jest.fn().mockResolvedValue(true),
      toJSON: jest.fn().mockReturnValue({
        id_usuario: 1,
        nome: "Usuário Atualizado",
      }),
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.update(req as any, res as any, next);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(mockUsuario.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve chamar next com erro 400 caso tente alterar o email", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        email: "novoemail@teste.com",
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockUsuario = {
      id_usuario: 1,
      email: "antigo@teste.com",
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.update(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
  });
});

describe("UsuarioController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockUsuario = {
      id_usuario: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    await UsuarioController.delete(req as any, res as any, next);

    expect(Usuario.findByPk).toHaveBeenCalledWith(1);
    expect(mockUsuario.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
  });
});