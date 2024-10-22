import request from "supertest";
import { app } from "../src/index";

describe("Contacts API", () => {
  let contactId: string;

  /**
   * Prueba para crear un nuevo contacto.
   * 
   * Esta prueba envía una solicitud POST a la ruta /api/v1/contacts
   * con los datos de un nuevo contacto. Verifica que la respuesta
   * tenga un estado 201 (Creado) y que el cuerpo de la respuesta
   * contenga las propiedades esperadas, incluyendo el ID del contacto
   * creado. El ID del contacto creado se almacena en la variable
   * contactId para su uso en pruebas posteriores.
   */
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

  /**
   * Prueba para recuperar todos los contactos.
   * 
   * Esta prueba envía una solicitud GET a la ruta /api/v1/contacts
   * y verifica que la respuesta tenga un estado 200 (OK) y que el
   * cuerpo de la respuesta sea un array (lista de contactos).
   */
  it("should retrieve all contacts", async () => {
    const response = await request(app).get("/api/v1/contacts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  /**
   * Prueba para eliminar un contacto por ID.
   * 
   * Esta prueba envía una solicitud DELETE a la ruta /api/v1/contacts/:id
   * utilizando el ID del contacto creado en la primera prueba. Verifica
   * que la respuesta tenga un estado 204 (Sin Contenido), lo que indica
   * que el contacto fue eliminado correctamente.
   */
  it("should delete a contact by ID", async () => {
    const response = await request(app).delete(`/api/v1/contacts/${contactId}`);

    expect(response.status).toBe(204);
  });
});