import { Pool } from "pg";
import { VerificationTokenRepository } from "../domain/repositories/VerificationTokenRepository";
import { VerificationCode } from "../domain/value-objects/VerificationCode";
import { NotificationChannel } from "../domain/value-objects/NotificationChannel";

export class PostgresVerificationTokenRepository
  implements VerificationTokenRepository
{
  constructor(private pool: Pool) {}

  async save(
    userId: string,
    code: VerificationCode,
    channel: NotificationChannel
  ): Promise<void> {
    const query = `
      INSERT INTO verification_tokens (user_id, code, created_at, expires_at, channel, verified)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await this.pool.query(query, [
      userId,
      code.getCode(),
      code.getCreatedAt(),
      code.getExpiresAt(),
      channel.getChannel(),
      false,
    ]);
  }

  async findValidCode(
    userId: string,
    inputCode: string
  ): Promise<VerificationCode | null> {
    const query = `
      SELECT code, created_at, expires_at
      FROM verification_tokens
      WHERE user_id = $1 AND code = $2 AND expires_at > NOW() AND verified = false
    `;
    const result = await this.pool.query(query, [userId, inputCode]);

    if (result.rowCount && result.rowCount > 0) {
      const { code, created_at, expires_at } = result.rows[0];
      return new VerificationCode(
        code,
        created_at,
        (expires_at.getTime() - created_at.getTime()) / 60000
      );
    }

    return null;
  }

  async invalidateCode(userId: string, code: string): Promise<void> {
    const query = `
      UPDATE verification_tokens
      SET verified = true
      WHERE user_id = $1 AND code = $2
    `;
    await this.pool.query(query, [userId, code]);
  }
}
