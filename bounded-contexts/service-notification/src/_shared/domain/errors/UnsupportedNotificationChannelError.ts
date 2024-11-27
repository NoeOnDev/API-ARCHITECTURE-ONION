import { DomainError } from "./DomainError";

export class UnsupportedNotificationChannelError extends DomainError {
  constructor(channel: string) {
    super(`Unsupported notification channel: ${channel}`, 400);
  }
}
