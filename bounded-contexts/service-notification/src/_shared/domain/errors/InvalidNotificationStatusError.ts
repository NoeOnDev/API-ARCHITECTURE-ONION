import { DomainError } from "./DomainError";

export class InvalidNotificationStatusError extends DomainError {
  constructor(status: string) {
    super(`Invalid notification status: ${status}`, 400);
  }
}
