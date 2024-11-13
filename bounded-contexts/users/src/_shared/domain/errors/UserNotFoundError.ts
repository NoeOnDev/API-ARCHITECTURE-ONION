import { DomainError } from "./DomainError";

export class UserNotFoundError extends DomainError {
  constructor() {
    super("User not found", 404);
  }
}
