import { validate } from "../../src/middlewares/validate.middleware";
import {
  createItemPedidoSchema,
  updateItemPedidoSchema,
} from "../../src/validators/itemPedido.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de ItemPedido - create", () => {
  const middleware = validate(createItemPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois id_pedido é inválido", async () => {
    const req = mockRequest({
      body: {
        id_pedido: "invalido",
        quantidade: 1,
        preco_unitario: 10,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois quantidade é inválida", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        quantidade: "invalido",
        preco_unitario: 10,
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois preco_unitario é inválido", async () => {
    const req = mockRequest({
      body: {
        id_pedido: 1,
        quantidade: 1,
        preco_unitario: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de ItemPedido - update", () => {
  const middleware = validate(updateItemPedidoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois quantidade é inválida", async () => {
    const req = mockRequest({
      body: {
        quantidade: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse teste deve falhar pois preco_unitario é inválido", async () => {
    const req = mockRequest({
      body: {
        preco_unitario: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});