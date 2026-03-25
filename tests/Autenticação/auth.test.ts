import AuthController from "../../src/controllers/auth.controllers";
import AuthService from "../../src/services/auth.service";
import jwt from "jsonwebtoken";

jest.mock("../../src/services/auth.service");
jest.mock("jsonwebtoken");

describe("AuthController - login", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      body: {
        email: "teste@email.com",
        senha: "123456",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it("esse teste deve retornar 200 e token quando login for válido", async () => {
    const mockUsuario = {
      get: (field: string) => {
        if (field === "id_usuario") return 1;
        if (field === "admin") return false;
      },
      toJSON: () => ({
        id_usuario: 1,
        email: "teste@email.com",
        senha: "hash",
      }),
    };

    (AuthService.login as jest.Mock).mockResolvedValue(mockUsuario);
    (jwt.sign as jest.Mock).mockReturnValue("token_fake");

    process.env.JWT_SECRET = "segredo";

    await AuthController.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      usuario: {
        id_usuario: 1,
        email: "teste@email.com",
      },
      token: "token_fake",
    });
  });

  it("esse teste deve retornar 401 se credenciais forem inválidas", async () => {
    (AuthService.login as jest.Mock).mockResolvedValue(null);

    await AuthController.login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("esse teste deve chamar next em caso de erro", async () => {
    (AuthService.login as jest.Mock).mockRejectedValue(new Error("erro"));

    await AuthController.login(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});