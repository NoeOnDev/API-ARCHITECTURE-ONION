import { Pool } from "pg";
import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export class PostgresContactRepository implements ContactRepository {
  constructor(private pool: Pool) {}

  async save(contact: Contact): Promise<void> {
    const query = `
      INSERT INTO contacts (id, first_name, last_name, email, phone)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE
      SET first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone;
    `;
    const values = [
      contact.getId(),
      contact.getFirstName(),
      contact.getLastName(),
      contact.getEmail(),
      contact.getPhone(),
    ];
    await this.pool.query(query, values);
  }

  async findAll(): Promise<Contact[]> {
    const query = `SELECT * FROM contacts`;
    const result = await this.pool.query(query);
    return result.rows.map(
      (row) => new Contact(row.first_name, row.last_name, row.email, row.phone)
    );
  }

  async findById(id: string): Promise<Contact | null> {
    const query = `SELECT * FROM contacts WHERE id = $1`;
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new Contact(row.first_name, row.last_name, row.email, row.phone);
  }

  async deleteById(id: string): Promise<void> {
    const query = `DELETE FROM contacts WHERE id = $1`;
    await this.pool.query(query, [id]);
  }
}
