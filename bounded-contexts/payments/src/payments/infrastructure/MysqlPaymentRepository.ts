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
    await this.pool.execute(query, values);
  }

  async findById(id: string): Promise<Payment | null> {
    const query = `
      SELECT * FROM payments WHERE id = ?
    `;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) {
      const row = rows[0];
      const payment = new Payment(
        row.paymentId,
        PaymentStatus.from(row.status),
        row.id
      );
      return payment;
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
    await this.pool.execute(query, values);
  }
}
