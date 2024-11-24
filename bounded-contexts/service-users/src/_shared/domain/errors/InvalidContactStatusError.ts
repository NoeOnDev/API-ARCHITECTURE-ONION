import { DomainError } from "./DomainError";

export class InvalidContactStatusError extends DomainError {
  constructor(status: string) {
    super(`Invalid contact status: ${status}`, 400);
  }
}
