import { DomainError } from "./DomainError";

export class InvalidTokenStatusError extends DomainError {
  constructor(status: string) {
    super(`Invalid token status: ${status}`, 400);
  }
}
