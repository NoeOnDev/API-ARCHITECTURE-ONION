import { DomainError } from "./DomainError";

export class InvalidReportCategoryError extends DomainError {
  constructor(category: string) {
    super(`Invalid report category: ${category}`, 400);
  }
}
