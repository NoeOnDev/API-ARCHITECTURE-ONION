import { DomainError } from "./DomainError";

export class NoNewsFoundError extends DomainError {
  constructor(newsId: string) {
    super(`No news found with ID: ${newsId}`, 404);
  }
}
