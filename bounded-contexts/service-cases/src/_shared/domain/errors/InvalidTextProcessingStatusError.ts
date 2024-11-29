import { DomainError } from "./DomainError";

export class InvalidTextProcessingStatusError extends DomainError {
  constructor(value: string) {
    super(`Invalid text processing status: ${value}`, 400);
  }
}
