import { DomainError } from "./DomainError";

export class UsernameAlreadyExistsError extends DomainError {
  constructor() {
    super("Username already exists", 409);
  }
}
