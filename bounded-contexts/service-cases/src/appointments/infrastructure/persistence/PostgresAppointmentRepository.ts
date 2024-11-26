import { Pool } from "pg";
import { Appointment } from "../../domain/Appointment";
import { AppointmentRepository } from "../../domain/AppointmentRepository";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";
import { AppointmentStatus } from "../../domain/value-objects/AppointmentStatus";

export class PostgresAppointmentRepository implements AppointmentRepository {
  constructor(private pool: Pool) {}

  private mapRowToAppointment(row: any): Appointment {
    return new Appointment(
      row.title,
      row.user_name,
      Identifier.fromString(row.user_id),
      row.description,
      new Date(row.date_time),
      row.locality,
      AppointmentStatus.fromValue(row.status),
      Identifier.fromString(row.id)
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const query = `
      INSERT INTO appointments (id, title, user_name, user_id, description, date_time, locality, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE
      SET title = EXCLUDED.title,
          user_name = EXCLUDED.user_name,
          user_id = EXCLUDED.user_id,
          description = EXCLUDED.description,
          date_time = EXCLUDED.date_time,
          locality = EXCLUDED.locality,
          status = EXCLUDED.status;
    `;
    const values = [
      appointment.getId().getValue(),
      appointment.getTitle(),
      appointment.getUserName(),
      appointment.getUserId().getValue(),
      appointment.getDescription(),
      appointment.getDateTime().toISOString(),
      appointment.getLocality(),
      appointment.getStatus().getValue(),
    ];
    await this.pool.query(query, values);
  }

  async findById(id: Identifier): Promise<Appointment | null> {
    const query = `SELECT * FROM appointments WHERE id = $1`;
    const result = await this.pool.query(query, [id.getValue()]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.mapRowToAppointment(result.rows[0]);
  }

  async findByUserId(userId: Identifier): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE user_id = $1 ORDER BY date_time DESC`;
    const result = await this.pool.query(query, [userId.getValue()]);
    return result.rows.map((row) => this.mapRowToAppointment(row));
  }

  async findByLocality(locality: string): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE locality = $1 ORDER BY date_time DESC`;
    const result = await this.pool.query(query, [locality]);
    return result.rows.map((row) => this.mapRowToAppointment(row));
  }

  async findByDateTimeRange(start: Date, end: Date): Promise<Appointment[]> {
    const query = `SELECT * FROM appointments WHERE date_time BETWEEN $1 AND $2 ORDER BY date_time DESC`;
    const result = await this.pool.query(query, [
      start.toISOString(),
      end.toISOString(),
    ]);
    return result.rows.map((row) => this.mapRowToAppointment(row));
  }

  async deleteById(id: Identifier): Promise<void> {
    const query = `DELETE FROM appointments WHERE id = $1`;
    await this.pool.query(query, [id.getValue()]);
  }
}
