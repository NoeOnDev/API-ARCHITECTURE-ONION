import { DomainError } from "../../../_shared/domain/errors/DomainError";

export class InvalidHobbyError extends DomainError {
  constructor(hobby: string) {
    super(`Invalid hobby: ${hobby}`, 400);
  }
}
