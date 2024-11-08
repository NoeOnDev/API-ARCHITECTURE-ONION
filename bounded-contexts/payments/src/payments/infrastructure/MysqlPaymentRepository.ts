import { Pool } from "mysql2/promise";
import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";
import { pool } from "../../_config/db.config";
import { PaymentStatus } from "../domain/value-objects/PaymentStatus";
import { RowDataPacket } from "mysql2";

export class MysqlPaymentRepository implements PaymentRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(payment: Payment): Promise<void> {
    const query = `
      INSERT INTO payments (id, paymentId, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      payment.getId(),
      payment.getPaymentId(),
      payment.getStatus().getValue(),
      payment.getCreatedAt(),
      payment.getUpdatedAt(),
    ];

    try {
      await this.pool.execute(query, values);
    } catch (error) {
      console.error("Error saving payment:", error);
      throw new Error("Failed to save payment");
    }
  }

  async findById(id: string): Promise<Payment | null> {
    const row = await this.findOneById<RowDataPacket>(id, "payments");
    if (row) {
      return new Payment(row.paymentId, PaymentStatus.from(row.status), row.id);
    }
    return null;
  }

  async update(payment: Payment): Promise<void> {
    const query = `
      UPDATE payments
      SET paymentId = ?, status = ?, createdAt = ?, updatedAt = ?
      WHERE id = ?
    `;
    const values = [
      payment.getPaymentId(),
      payment.getStatus().getValue(),
      payment.getCreatedAt(),
      payment.getUpdatedAt(),
      payment.getId(),
    ];

    try {
      await this.pool.execute(query, values);
    } catch (error) {
      console.error("Error updating payment:", error);
      throw new Error("Failed to update payment");
    }
  }

  private async findOneById<T>(
    id: string,
    tableName: string
  ): Promise<T | null> {
    const query = `SELECT * FROM ?? WHERE id = ?`;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [
      tableName,
      id,
    ]);
    return rows.length > 0 ? (rows[0] as T) : null;
  }
}
