import { DomainError } from "./DomainError";

export class InvalidTokenUserError extends DomainError {
  constructor() {
    super("Token does not belong to the specified user", 403);
  }
}
