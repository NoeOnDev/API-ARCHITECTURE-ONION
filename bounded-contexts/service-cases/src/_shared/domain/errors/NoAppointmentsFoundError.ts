import { DomainError } from "./DomainError";

export class NoAppointmentsFoundError extends DomainError {
  constructor(userId: string) {
    super(`No appointments found for user ID: ${userId}`, 404);
  }
}
