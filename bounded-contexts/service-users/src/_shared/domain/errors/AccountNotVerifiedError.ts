import { DomainError } from "./DomainError";

export class AccountNotVerifiedError extends DomainError {
  constructor() {
    super("Account not verified", 403);
  }
}
