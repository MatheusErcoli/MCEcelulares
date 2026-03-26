import request from "supertest";
import app from "../src/app";

describe("Testes da API", () => {
  it("GET /teste deve retornar ok", async () => {
    const response = await request(app).get("/teste");

    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe("ok");
  });
});
