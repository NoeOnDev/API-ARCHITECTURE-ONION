import { DomainError } from "./DomainError";

export class ContactAlreadyRegisteredError extends DomainError {
  constructor() {
    super("Contact already registered as user", 409);
  }
}
