import { Pool } from "mysql2/promise";
import { Donation } from "../domain/Donation";
import { DonationRepository } from "../domain/DonationRepository";
import { pool } from "../../_config/db.config";
import { DonationStatus } from "../domain/value-objects/DonationStatus";
import { Payment } from "../../payments/domain/Payment";
import { PaymentStatus } from "../../payments/domain/value-objects/PaymentStatus";
import { RowDataPacket } from "mysql2";

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
    await this.pool.execute(query, values);
  }

  async findById(id: string): Promise<Donation | null> {
    const query = `
      SELECT * FROM donations WHERE id = ?
    `;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [id]);
    if (rows.length > 0) {
      const row = rows[0];
      const donation = new Donation(
        row.amount,
        row.userId,
        row.id,
        DonationStatus.from(row.status),
        row.paymentId ? await this.findPaymentById(row.paymentId) : null
      );
      return donation;
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
    await this.pool.execute(query, values);
  }

  private async findPaymentById(paymentId: string): Promise<Payment | null> {
    const query = `
      SELECT * FROM payments WHERE id = ?
    `;
    const [rows] = await this.pool.execute<RowDataPacket[]>(query, [paymentId]);
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
}
