import { DomainError } from "./DomainError";

export class EmailNotificationError extends DomainError {
  constructor(message: string) {
    super(`Email Notification Error: ${message}`, 502);
  }
}
