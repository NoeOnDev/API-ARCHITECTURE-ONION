import { NotificationType } from "./NotificationType";

export interface NotificationMessageProvider {
  getMessage(notificationType: NotificationType): string;
}
