import { DomainError } from "./DomainError";

export class InvalidEventTypeError extends DomainError {
  constructor(eventType: string) {
    super(`Invalid event type: ${eventType}`, 400);
  }
}
