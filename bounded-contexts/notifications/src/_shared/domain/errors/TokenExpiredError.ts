import { DomainError } from "./DomainError";

export class TokenExpiredError extends DomainError {
  constructor() {
    super("Token has expired", 400);
  }
}
