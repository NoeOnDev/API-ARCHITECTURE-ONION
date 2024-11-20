import { Pool } from "pg";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { Contact } from "../../../contacts/domain/Contact";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";
import { ContactHobby } from "../../../contacts/domain/value-objects/ContactHobbit";
import { ContactStatus } from "../../../contacts/domain/value-objects/ContactStatus";
import { UserRole } from "../../domain/value-objects/UserRole";

export class PostgresUserRepository implements UserRepository {
  constructor(private pool: Pool) {}

  private mapRowToUser(row: any): User {
    const contact = new Contact(
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      ContactHobby.fromString(row.hobby),
      ContactStatus.fromValue(row.status),
      Identifier.fromString(row.contact_id)
    );

    return new User(
      row.username,
      row.password,
      contact,
      UserRole.fromValue(row.role),
      Identifier.fromString(row.id),
      row.verified
    );
  }

  async save(user: User): Promise<void> {
    const query = `
      INSERT INTO users (id, username, password, contact_id, verified, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE
      SET username = EXCLUDED.username,
          password = EXCLUDED.password,
          contact_id = EXCLUDED.contact_id,
          verified = EXCLUDED.verified,
          role = EXCLUDED.role;
    `;
    const values = [
      user.getId().getValue(),
      user.getUsername(),
      user.getPassword(),
      user.getContact().getId().getValue(),
      user.getVerificationDate(),
      user.getRole().getValue(),
    ];
    await this.pool.query(query, values);
  }

  async findAll(): Promise<User[]> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status, c.hobby
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
    `;
    const result = await this.pool.query(query);
    return result.rows.map((row) => this.mapRowToUser(row));
  }

  async findById(id: Identifier): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status, c.hobby
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE u.id = $1
    `;
    const result = await this.pool.query(query, [id.getValue()]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }

  async deleteById(id: Identifier): Promise<void> {
    const query = `DELETE FROM users WHERE id = $1`;
    await this.pool.query(query, [id.getValue()]);
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status, c.hobby
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE u.username = $1
    `;
    const result = await this.pool.query(query, [username]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT u.*, c.first_name, c.last_name, c.email, c.phone, c.status, c.hobby
      FROM users u
      JOIN contacts c ON u.contact_id = c.id
      WHERE c.email = $1
    `;
    const result = await this.pool.query(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToUser(result.rows[0]);
  }
}
