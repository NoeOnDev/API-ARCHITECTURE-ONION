import { Notification } from "./Notification";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findByRecipientId(recipientId: string): Promise<Notification[]>;
  findById(id: string): Promise<Notification | null>;
}
