import { DomainError } from "./DomainError";

export class InvalidReportStatusError extends DomainError {
  constructor(value: string) {
    super(`Invalid report status: ${value}`, 400);
  }
}