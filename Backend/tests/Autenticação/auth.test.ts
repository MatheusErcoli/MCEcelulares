import AuthController from "../../src/controllers/auth.controllers";
import { mockRequest, mockResponse } from "../test.helpers";
import { HttpError } from "../../src/types/http_error";

jest.mock("../../src/services/auth.service", () => ({
  __esModule: true,
  default: { login: jest.fn().mockResolvedValue(null) },
}));

describe("AuthController - login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("esse teste deve retornar 401 se credenciais forem inválidas", async () => {
    const req = mockRequest({
      body: { email: "invalido@teste.com", senha: "123" },
    });
    const res = mockResponse();
    const next = jest.fn();

    await AuthController.login(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(HttpError));
  });
});