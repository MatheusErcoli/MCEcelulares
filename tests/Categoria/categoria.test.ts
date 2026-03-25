import CategoriaController from "../../src/controllers/categoria.controllers";
import Categoria from "../../src/models/Categoria";

jest.mock("../../src/models/Categoria");

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe("CategoriaController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todas as categorias corretamente", async () => {
    const req: any = {};
    const res = mockResponse();

    const mockCategorias = [
      { id_categoria: 1, nome: "Eletrônicos" },
      { id_categoria: 2, nome: "Roupas" },
    ];

    (Categoria.findAll as jest.Mock).mockResolvedValue(mockCategorias);

    await CategoriaController.findAll(req, res);

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
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockCategoria = {
      id_categoria: 1,
      nome: "Eletrônicos",
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.findById(req, res);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategoria);
  });

  it("deve retornar 404 se categoria não existir", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Categoria não encontrada",
    });
  });
});

describe("CategoriaController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para criar uma categoria com sucesso", async () => {
    const req: any = {
      body: {
        nome: "Eletrônicos",
        descricao: "Produtos eletrônicos",
        ativo: true,
      },
    };

    const res = mockResponse();

    const mockCategoriaCriada = {
      id_categoria: 1,
      ...req.body,
    };

    (Categoria.create as jest.Mock).mockResolvedValue(mockCategoriaCriada);

    await CategoriaController.create(req, res);

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
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    };

    const res = mockResponse();

    const mockCategoria = {
      id_categoria: 1,
      nome: "Antigo",
      update: jest.fn().mockResolvedValue(true),
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.update(req, res);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(mockCategoria.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCategoria);
  });

  it("esse teste deve retornar erro caso a categoria não existir", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Atualizado",
      },
    };

    const res = mockResponse();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Categoria não encontrada",
    });
  });
});

describe("CategoriaController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockCategoria = {
      id_categoria: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Categoria.findByPk as jest.Mock).mockResolvedValue(mockCategoria);

    await CategoriaController.delete(req, res);

    expect(Categoria.findByPk).toHaveBeenCalledWith(1);
    expect(mockCategoria.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 caso não consiga dar o delete", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Categoria.findByPk as jest.Mock).mockResolvedValue(null);

    await CategoriaController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Categoria não encontrada",
    });
  });
});