import { Notification } from "./Notification";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  findByRecipientId(recipientId: Identifier): Promise<Notification[]>;
  findById(id: Identifier): Promise<Notification | null>;
}
