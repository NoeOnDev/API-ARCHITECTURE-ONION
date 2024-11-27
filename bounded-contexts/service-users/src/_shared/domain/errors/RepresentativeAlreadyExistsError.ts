import { DomainError } from "./DomainError";

export class RepresentativeAlreadyExistsError extends DomainError {
  constructor(locality: string) {
    super(
      `A verified representative already exists in locality: ${locality}`,
      409
    );
  }
}
