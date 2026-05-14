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
    const next = jest.fn();

    (Carrinho.findAll as jest.Mock).mockResolvedValue([
      { id_carrinho: 1 },
      { id_carrinho: 2 },
    ]);

    await CarrinhoController.findAll(req, res, next);

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
      userId: 1,
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCarrinho = { id_carrinho: 1 };

    (Carrinho.findOne as jest.Mock).mockResolvedValue(mockCarrinho);
    await CarrinhoController.findById(req as any, res as any, next);

    expect(Carrinho.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCarrinho);
  });

  it("esse teste deve retornar 204 se nao encontrar o carrinho ativo do usuario", async () => {
    const req = mockRequest({
      params: { id: "1" },
      userId: 1,
    });

    const res = mockResponse();
    const next = jest.fn();

    (Carrinho.findOne as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.findById(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith();
    expect(next).not.toHaveBeenCalled();
  });
});

describe("CarrinhoController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve criar carrinho com sucesso", async () => {
    const req = mockRequest({
      userId: 1,
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCarrinho = { id_carrinho: 1, id_usuario: 1, ativo: true };

    (Carrinho.findOrCreate as jest.Mock).mockResolvedValue([mockCarrinho, true]);

    await CarrinhoController.create(req as any, res as any, next);

    expect(Carrinho.findOrCreate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id_carrinho: 1 }));
  });
});

describe("CarrinhoController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar carrinho com sucesso", async () => {
    const req = mockRequest({
      params: { id: "1" },
      userId: 1,
      body: {
        ativo: false,
      },
    });

    const res = mockResponse();
    const next = jest.fn();

    const mockCarrinho = {
      id_usuario: 1,
      update: jest.fn().mockResolvedValue(true),
    };

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.update(req as any, res as any, next);

    expect(Carrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockCarrinho.update).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("esse teste deve chamar o next com erro se carrinho nao existir", async () => {
    const req = mockRequest({
      params: { id: "1" },
      userId: 1,
      body: {},
    });

    const res = mockResponse();
    const next = jest.fn();

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.update(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
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
    const next = jest.fn();

    const mockCarrinho = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(mockCarrinho);

    await CarrinhoController.delete(req, res, next);

    expect(Carrinho.findByPk).toHaveBeenCalledWith(1);
    expect(mockCarrinho.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve chamar o next com erro ao deletar carrinho inexistente", async () => {
    const req = mockRequest({
      params: { id: "1" },
    });

    const res = mockResponse();
    const next = jest.fn();

    (Carrinho.findByPk as jest.Mock).mockResolvedValue(null);

    await CarrinhoController.delete(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
