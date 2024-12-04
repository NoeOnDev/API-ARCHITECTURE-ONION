import { AppointmentRepository } from "../domain/AppointmentRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NoAppointmentsFoundError } from "../../_shared/domain/errors/NoAppointmentsFoundError";

export class UpdateAppointmentDescription {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(
    appointmentId: string,
    newTitle: string,
    newDescription: string
  ): Promise<void> {
    const identifier = Identifier.fromString(appointmentId);
    const appointment = await this.appointmentRepository.findById(identifier);

    if (!appointment) {
      throw new NoAppointmentsFoundError(appointmentId);
    }

    appointment.setTitle(newTitle);
    appointment.setDescription(newDescription);
    await this.appointmentRepository.save(appointment);
  }
}
