import { NotificationChannel } from "../value-objects/NotificationChannel";

export interface NotificationLogRepository {
  logNotification(
    userId: string,
    channel: NotificationChannel,
    messageType: string,
    status: string
  ): Promise<void>;
}
