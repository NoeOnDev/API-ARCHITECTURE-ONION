import { DomainError } from "./DomainError";

export class TokenNotFoundError extends DomainError {
  constructor() {
    super("Token not found", 404);
  }
}
