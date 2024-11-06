import { Notification } from "./Notification";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findByUserId(userId: string): Promise<Notification[]>;
  findById(id: string): Promise<Notification | null>;
}
