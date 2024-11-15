import { NotificationType } from "../NotificationType";
import { DomainError } from "./DomainError";

export class InvalidNotificationTypeError extends DomainError {
  constructor(notificationType: NotificationType) {
    super(`Invalid notification type: ${notificationType}`, 400);
  }
}