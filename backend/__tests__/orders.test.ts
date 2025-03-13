import request from "supertest";
import { app } from "../src/server"; // Importando `app` corrigido

describe("Testando rotas de pedidos", () => {
  it("Deve criar um novo pedido", async () => {
    const response = await request(app)
      .post("/orders")
      .send({ cliente: "Bianca", sabor: "Calabresa" });

    expect(response.status).toBe(201); // Espera status 201 (Criado)
    expect(response.body).toHaveProperty("id"); // Espera que tenha um ID
  });

  it("Deve retornar todos os pedidos", async () => {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(200); // Espera status 200 (OK)
    expect(Array.isArray(response.body)).toBe(true); // Deve ser um array
  });
});
