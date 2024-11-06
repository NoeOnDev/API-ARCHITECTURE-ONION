import { NotificationChannel } from "../value-objects/NotificationChannel";

export interface NotificationService {
  send(channel: NotificationChannel, message: string): Promise<void>;
}
