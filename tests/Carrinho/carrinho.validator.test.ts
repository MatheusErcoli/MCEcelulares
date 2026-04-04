import { validate } from "../../src/middlewares/validate.middleware";
import {
  createCarrinhoSchema,
  updateCarrinhoSchema,
} from "../../src/validators/carrinho.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Carrinho - create", () => {
  const middleware = validate(createCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois id_usuario é inválido", async () => {
    const req = mockRequest({
      body: {
        id_usuario: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Carrinho - update", () => {
  const middleware = validate(updateCarrinhoSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve falhar pois id_usuario é inválido", async () => {
    const req = mockRequest({
      body: {
        id_usuario: "invalido",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});