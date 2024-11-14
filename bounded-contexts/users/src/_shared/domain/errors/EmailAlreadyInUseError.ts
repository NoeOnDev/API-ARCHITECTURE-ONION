import { DomainError } from "./DomainError";

export class EmailAlreadyInUseError extends DomainError {
  constructor() {
    super("This email is already associated with a registered user", 409);
  }
}
