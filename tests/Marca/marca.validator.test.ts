import { validate } from "../../src/middlewares/validate.middleware";
import {
  createMarcaSchema,
  updateMarcaSchema,
} from "../../src/validators/marca.validator";
import { mockRequest, mockResponse } from "../test.helpers";

describe("Validação de Marca - create", () => {
  const middleware = validate(createMarcaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse deve falhar pois o nome é muito curto", async () => {
    const req = mockRequest({
      body: {
        nome: "a",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });

  it("esse deve falhar pois o nome é muito longo", async () => {
    const req = mockRequest({
      body: {
        nome: "a".repeat(256),
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});

describe("Validação de Marca - update", () => {
  const middleware = validate(updateMarcaSchema);
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("esse deve falhar caso o nome seja inválido", async () => {
    const req = mockRequest({
      body: {
        nome: "",
      },
    });
    const res = mockResponse();
    await middleware(req as any, res as any, next);
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});