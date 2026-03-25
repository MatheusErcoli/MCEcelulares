import { validate } from "../../src/middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../../src/validators/itemPedido.validator";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Validação de ItemPedido - create", () => {
  const middleware = validate(createItemPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve passar a validação com dados válidos", () => {
    const req: any = {
      body: {
        id_pedido: 1,
        id_produto: 2,
        quantidade: 3,
        preco_unitario: 50,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois id_pedido é inválido", () => {
    const req: any = {
      body: {
        id_pedido: -1,
        id_produto: 2,
        quantidade: 3,
        preco_unitario: 50,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req: any = {
      body: {
        id_pedido: 1,
        id_produto: 2,
        quantidade: 0,
        preco_unitario: 50,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req: any = {
      body: {
        id_pedido: 1,
        id_produto: 2,
        quantidade: 3,
        preco_unitario: -10,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe("Validação de ItemPedido - update", () => {
  const middleware = validate(updateItemPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve aceitar update parcial", () => {
    const req: any = {
      body: {
        quantidade: 5,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve aceitar múltiplos campos válidos", () => {
    const req: any = {
      body: {
        quantidade: 5,
        preco_unitario: 100,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("esse teste deve falhar pois quantidade é inválida", () => {
    const req: any = {
      body: {
        quantidade: 0,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("esse teste deve falhar pois preco_unitario é inválido", () => {
    const req: any = {
      body: {
        preco_unitario: -5,
      },
    };

    const res = mockResponse();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});