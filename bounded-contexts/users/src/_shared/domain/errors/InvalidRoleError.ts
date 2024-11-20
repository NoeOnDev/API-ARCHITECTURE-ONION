import { DomainError } from "./DomainError";

export class InvalidRoleError extends DomainError {
  constructor(role: string) {
    super(`Invalid role: ${role}`, 400);
  }
}
