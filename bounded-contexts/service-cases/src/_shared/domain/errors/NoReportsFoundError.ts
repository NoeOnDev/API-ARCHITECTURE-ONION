import { DomainError } from "./DomainError";

export class NoReportsFoundError extends DomainError {
  constructor(locality: string) {
    super(`No reports found for locality: ${locality}`, 404);
  }
}
