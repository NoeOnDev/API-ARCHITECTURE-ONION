import { NotificationType } from "../../auth/domain/NotificationType";

export interface NotificationMessageProvider {
  getMessage(notificationType: NotificationType): string;
}
