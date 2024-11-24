import { DomainError } from "./DomainError";

export class InvalidIdentifierError extends DomainError {
  constructor(id: string) {
    super(`Invalid identifier: ${id}`, 400);
  }
}
