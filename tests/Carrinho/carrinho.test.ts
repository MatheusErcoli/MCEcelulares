import CarrinhoController from "../../src/controllers/carrinho.controllers";
import Carrinho from "../../src/models/Carrinho";
import { mockRequest, mockResponse } from "../test.helpers";

jest.mock("../../src/models/Carrinho");



describe("CarrinhoController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todos os carrinhos", async () => {
    const req = mockRequest();
    const res = mockResponse();

    (Carrinho.findAll as jest.Mock).mockResolvedValue([
      { id_carrinho: 1 },
      { id_carrinho: 2 },
    ]);

    await CarrinhoController.findAll(req, res);

    expect(Carrinho.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });
});

describe("CarrinhoController - findById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar um carrinho pelo ID", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockCarrinho = { id_carrinho: 1 };

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.findById(req, res);

    expect(Carrinho.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCarrinho);
  });

  it("esse teste deve retornar erro 404 se não encontrar o carrinho", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("CarrinhoController - findActiveByUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar carrinho ativo do usuário", async () => {
    const req = mockRequest({
      params: { id_usuario: "1" },
    });

    const res = mockResponse();

    const mockCarrinho = { id_carrinho: 1, ativo: true };

    (Carrinho.findOrCreate as jest.Mock).mockResolvedValue([
      mockCarrinho,
      false,
    ]);

    await CarrinhoController.findActiveByUser(req, res);

    expect(Carrinho.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id_usuario: 1, ativo: true },
      })
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCarrinho);
  });
});

describe("CarrinhoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar carrinho com sucesso", async () => {
    const req = mockRequest({
      body: {
        id_usuario: 1,
        ativo: true,
      },
    });

    const res = mockResponse();

    const mockCarrinho = { id_carrinho: 1, ...req.body };

    (Carrinho.create as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.create(req, res);

    expect(Carrinho.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCarrinho);
  });
});

describe("CarrinhoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar carrinho com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {
        ativo: false,
      },
    });

    const res = mockResponse();

    const mockCarrinho = {
      update: jest.fn().mockResolvedValue(true),
    };

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.update(req, res);

    expect(Carrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockCarrinho.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve retornar erro se carrinho não existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      body: {},
    });

    const res = mockResponse();

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe("CarrinhoController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve deletar carrinho com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    const mockCarrinho = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.delete(req, res);

    expect(Carrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockCarrinho.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 ao deletar carrinho inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


