import request from "supertest";
import { app } from "../src/index";

describe("Contacts API", () => {
  let contactId: string;

  it("should create a new contact", async () => {
    const response = await request(app).post("/api/v1/contacts").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("firstName", "John");
    expect(response.body).toHaveProperty("lastName", "Doe");
    expect(response.body).toHaveProperty("email", "john.doe@example.com");
    expect(response.body).toHaveProperty("phone", "1234567890");

    contactId = response.body.id;
  });

  it("should retrieve all contacts", async () => {
    const response = await request(app).get("/api/v1/contacts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should retrieve a contact by ID", async () => {
    const response = await request(app).get(`/api/v1/contacts/${contactId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", contactId);
  });

  it("should delete a contact by ID", async () => {
    const response = await request(app).delete(`/api/v1/contacts/${contactId}`);

    expect(response.status).toBe(204);
  });
});
