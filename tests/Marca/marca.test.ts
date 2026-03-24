import MarcaController from "../../src/controllers/marca.controllers";
import Marca from "../../src/models/Marca";

jest.mock("../../src/models/Marca");

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe("MarcaController - findAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar todas as marcas corretamente", async () => {
    const req: any = {};
    const res = mockResponse();

    const mockMarcas = [
      { id: 1, nome: "Nike" },
      { id: 2, nome: "Adidas" },
    ];

    (Marca.findAll as jest.Mock).mockResolvedValue(mockMarcas);

    await MarcaController.findAll(req, res);

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
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockMarca = {
      id: 1,
      nome: "Nike",
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.findById(req, res);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMarca);
  });

  it("esse teste deve retornar erro 404 caso a marca não exista", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.findById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Marca não encontrada",
    });
  });
});

describe("MarcaController - create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para criar uma marca com sucesso", async () => {
    const req: any = {
      body: {
        nome: "Nike",
      },
    };

    const res = mockResponse();

    const mockMarcaCriada = {
      id: 1,
      nome: "Nike",
    };

    (Marca.create as jest.Mock).mockResolvedValue(mockMarcaCriada);

    await MarcaController.create(req, res);

    expect(Marca.create).toHaveBeenCalledWith({
      nome: req.body.nome,
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockMarcaCriada);
  });
});

describe("MarcaController - update", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve atualizar a marca com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Adidas",
      },
    };

    const res = mockResponse();

    const mockMarca = {
      id: 1,
      nome: "Nike",
      update: jest.fn().mockResolvedValue(true),
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.update(req, res);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);
    expect(mockMarca.update).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMarca);
  });

  it("esse teste deve retornar erro caso a marca não existir", async () => {
    const req: any = {
      params: { id: "1" },
      body: {
        nome: "Adidas",
      },
    };

    const res = mockResponse();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Marca não encontrada",
    });
  });
});

describe("MarcaController - delete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste é para deletar com sucesso", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    const mockMarca = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    (Marca.findByPk as jest.Mock).mockResolvedValue(mockMarca);

    await MarcaController.delete(req, res);

    expect(Marca.findByPk).toHaveBeenCalledWith(1);
    expect(mockMarca.destroy).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("esse teste deve retornar erro 404 caso não consiga dar o delete", async () => {
    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    (Marca.findByPk as jest.Mock).mockResolvedValue(null);

    await MarcaController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Marca não encontrada",
    });
  });
});