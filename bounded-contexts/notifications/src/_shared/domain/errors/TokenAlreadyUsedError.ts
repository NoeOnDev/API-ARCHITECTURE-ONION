import { DomainError } from "./DomainError";

export class TokenAlreadyUsedError extends DomainError {
  constructor() {
    super("Token has already been used", 400);
  }
}
