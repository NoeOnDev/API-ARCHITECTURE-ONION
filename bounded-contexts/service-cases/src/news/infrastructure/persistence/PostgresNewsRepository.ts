import { Pool } from "pg";
import { News } from "../../domain/News";
import { NewsRepository } from "../../domain/NewsRepository";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";

export class PostgresNewsRepository implements NewsRepository {
  constructor(private pool: Pool) {}

  private mapRowToNews(row: any): News {
    return new News(
      row.title,
      row.description,
      row.locality,
      Identifier.fromString(row.user_id),
      new Date(row.created_at),
      Identifier.fromString(row.id)
    );
  }

  async save(news: News): Promise<void> {
    const query = `
      INSERT INTO news (id, title, description, locality, user_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          description = EXCLUDED.description,
          locality = EXCLUDED.locality,
          user_id = EXCLUDED.user_id,
          created_at = EXCLUDED.created_at;
    `;
    const values = [
      news.getId().getValue(),
      news.getTitle(),
      news.getDescription(),
      news.getLocality(),
      news.getUserId().getValue(),
      news.getCreatedAt(),
    ];
    await this.pool.query(query, values);
  }

  async findById(id: Identifier): Promise<News | null> {
    const query = `SELECT * FROM news WHERE id = $1`;
    const result = await this.pool.query(query, [id.getValue()]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToNews(result.rows[0]);
  }

  async findByLocality(locality: string): Promise<News[]> {
    const query = `SELECT * FROM news WHERE locality = $1 ORDER BY created_at DESC`;
    const result = await this.pool.query(query, [locality]);
    return result.rows.map((row) => this.mapRowToNews(row));
  }

  async findByUserId(userId: Identifier): Promise<News[]> {
    const query = `SELECT * FROM news WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await this.pool.query(query, [userId.getValue()]);
    return result.rows.map((row) => this.mapRowToNews(row));
  }

  async deleteById(id: Identifier): Promise<void> {
    const query = `DELETE FROM news WHERE id = $1`;
    await this.pool.query(query, [id.getValue()]);
  }
}
