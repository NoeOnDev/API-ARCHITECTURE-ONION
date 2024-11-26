import { DomainError } from "./DomainError";

export class NoNewsFoundForLocalityError extends DomainError {
  constructor(locality: string) {
    super(`No news found for locality: ${locality}`, 404);
  }
}
