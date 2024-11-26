import { DomainError } from "./DomainError";

export class NoNewsFoundForUserError extends DomainError {
  constructor(userId: string) {
    super(`No news found for user ID: ${userId}`, 404);
  }
}
