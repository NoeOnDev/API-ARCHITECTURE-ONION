import { DomainError } from "./DomainError";

export class ContactNotFoundError extends DomainError {
  constructor() {
    super("Contact not found", 404);
  }
}
