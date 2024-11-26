import { DomainError } from "./DomainError";

export class InvalidAppointmentStatusError extends DomainError {
  constructor(value: string) {
    super(`Invalid appointment status: ${value}`, 400);
  }
}
