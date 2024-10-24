import { Pool } from "pg";
import { NotificationLogRepository } from "../domain/repositories/NotificationLogRepository";
import { NotificationChannel } from "../domain/value-objects/NotificationChannel";

export class PostgresNotificationLogRepository
  implements NotificationLogRepository
{
  constructor(private pool: Pool) {}
  async logNotification(
    userId: string,
    channel: NotificationChannel,
    messageType: string,
    status: string
  ): Promise<void> {
    const query = `
      INSERT INTO notifications_log (user_id, channel, message_type, sent_at, status)
      VALUES ($1, $2, $3, NOW(), $4)
    `;
    await this.pool.query(query, [
      userId,
      channel.getChannel(),
      messageType,
      status,
    ]);
  }
}
