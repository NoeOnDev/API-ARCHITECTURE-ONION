import { Pool } from "pg";
import { Report } from "../../domain/Report";
import { ReportRepository } from "../../domain/ReportRepository";
import { ReportCategory } from "../../domain/value-objects/ReportCategory";
import { ReportAddress } from "../../domain/value-objects/ReportAddress";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";
import { ReportStatus } from "../../domain/value-objects/ReportStatus";
import { TextProcessingStatus } from "../../../_shared/domain/value-objects/TextProcessingStatus";

export class PostgresReportRepository implements ReportRepository {
  constructor(private pool: Pool) {}

  private mapRowToReport(row: any): Report {
    return new Report(
      row.title,
      ReportCategory.fromString(row.category),
      row.description,
      new ReportAddress(row.locality, row.street),
      Identifier.fromString(row.user_id),
      row.created_at,
      Identifier.fromString(row.id),
      ReportStatus.from(row.status),
      TextProcessingStatus.from(row.processing_status)
    );
  }

  async save(report: Report): Promise<void> {
    const query = `
      INSERT INTO reports (id, title, category, description, locality, street, user_id, created_at, status, processing_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          locality = EXCLUDED.locality,
          street = EXCLUDED.street,
          user_id = EXCLUDED.user_id,
          created_at = EXCLUDED.created_at,
          status = EXCLUDED.status,
          processing_status = EXCLUDED.processing_status;
    `;
    const values = [
      report.getId().getValue(),
      report.getTitle(),
      report.getCategory().getValue(),
      report.getDescription(),
      report.getAddress().getLocality(),
      report.getAddress().getStreet(),
      report.getUserId().getValue(),
      report.getCreatedAt(),
      report.getStatus().getValue(),
      report.getProcessingStatus().getValue(),
    ];
    await this.pool.query(query, values);
  }

  async findById(id: Identifier): Promise<Report | null> {
    const query = `SELECT * FROM reports WHERE id = $1`;
    const result = await this.pool.query(query, [id.getValue()]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToReport(result.rows[0]);
  }

  async findByUserId(userId: Identifier): Promise<Report[]> {
    const query = `SELECT * FROM reports WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await this.pool.query(query, [userId.getValue()]);
    return result.rows.map((row) => this.mapRowToReport(row));
  }

  async findByLocality(locality: string): Promise<Report[]> {
    const query = `SELECT * FROM reports WHERE locality = $1 ORDER BY created_at DESC`;
    const result = await this.pool.query(query, [locality]);
    return result.rows.map((row) => this.mapRowToReport(row));
  }

  async deleteById(id: Identifier): Promise<void> {
    const query = `DELETE FROM reports WHERE id = $1`;
    await this.pool.query(query, [id.getValue()]);
  }
}
