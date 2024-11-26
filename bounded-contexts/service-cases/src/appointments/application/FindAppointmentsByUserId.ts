import { AppointmentRepository } from "../domain/AppointmentRepository";
import { Appointment } from "../domain/Appointment";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoAppointmentsFoundError } from "../../_shared/domain/errors/NoAppointmentsFoundError";

export class FindAppointmentsByUserId {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(userId: string): Promise<Appointment[]> {
    const identifier = Identifier.fromString(userId);
    const appointments = await this.appointmentRepository.findByUserId(
      identifier
    );

    if (appointments.length === 0) {
      throw new NoAppointmentsFoundError(userId);
    }

    return appointments;
  }
}
