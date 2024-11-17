import { DomainError } from "./DomainError";

export class UnsupportedChannelError extends DomainError {
  constructor(channel: string) {
    super(`Unsupported notification channel: ${channel}`, 400);
  }
}
