import { Pool } from "mysql2/promise";
import { Donation } from "../domain/Donation";
import { DonationRepository } from "../domain/DonationRepository";
import { pool } from "../../_config/db.config";
import { DonationStatus } from "../domain/value-objects/DonationStatus";
import { RowDataPacket } from "mysql2";
import { Payment } from "../../payments/domain/Payment";

export class MysqlDonationRepository implements DonationRepository {
  private pool: Pool;

  constructor() {
    this.pool = pool;
  }

  async save(donation: Donation): Promise<void> {
    const query = `
      INSERT INTO donations (id, amount, userId, status, createdAt, paymentId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      donation.getId(),
      donation.getAmount(),
      donation.getUserId(),
      donation.getStatus().getValue(),
      donation.getCreatedAt(),
      donation.getPayment() ? donation.getPayment()!.getId() : null,
    ];

    try {
      await this.pool.execute(query, values);
    } catch (error) {
      console.error("Error saving donation:", error);
      throw new Error("Failed to save donation");
    }
  }

  async findById(id: string): Promise<Donation | null> {
    const row = await this.findOneById<RowDataPacket>(id, "donations");
    if (row) {
      return new Donation(
        row.amount,
        row.userId,
        row.id,
        DonationStatus.from(row.status),
        row.paymentId
      );
    }
    return null;
  }

  async update(donation: Donation): Promise<void> {
    const query = `
      UPDATE donations
      SET amount = ?, userId = ?, status = ?, createdAt = ?, paymentId = ?
      WHERE id = ?
    `;
    const values = [
      donation.getAmount(),
      donation.getUserId(),
      donation.getStatus().getValue(),
      donation.getCreatedAt(),
      donation.getPayment() ? donation.getPayment()!.getId() : null,
      donation.getId(),
    ];

    try {
      await this.pool.execute(query, values);
    } catch (error) {
      console.error("Error updating donation:", error);
      throw new Error("Failed to update donation");
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

  async saveDonationAndPayment(
    donation: Donation,
    payment: Payment
  ): Promise<void> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.execute(
        `INSERT INTO payments (id, paymentId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        [
          payment.getId(),
          payment.getPaymentId(),
          payment.getStatus().getValue(),
          payment.getCreatedAt(),
          payment.getUpdatedAt(),
        ]
      );

      await connection.execute(
        `INSERT INTO donations (id, amount, userId, status, createdAt, paymentId) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          donation.getId(),
          donation.getAmount(),
          donation.getUserId(),
          donation.getStatus().getValue(),
          donation.getCreatedAt(),
          payment.getId(),
        ]
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Transaction failed:", error);
      throw new Error("Failed to save donation and payment in transaction");
    } finally {
      connection.release();
    }
  }
}
