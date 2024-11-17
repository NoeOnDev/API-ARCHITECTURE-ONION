import { DomainError } from "./DomainError";

export class TwilioNotificationError extends DomainError {
  constructor(message: string) {
    super(`Twilio Notification Error: ${message}`, 502);
  }
}
