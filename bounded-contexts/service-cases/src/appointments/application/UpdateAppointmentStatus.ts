import { AppointmentRepository } from "../domain/AppointmentRepository";
import { Appointment } from "../domain/Appointment";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { AppointmentStatus } from "../domain/value-objects/AppointmentStatus";
import { NoAppointmentsFoundError } from "../../_shared/domain/errors/NoAppointmentsFoundError";

export class UpdateAppointmentStatus {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(appointmentId: string, status: string): Promise<Appointment> {
    const identifier = Identifier.fromString(appointmentId);
    const appointment = await this.appointmentRepository.findById(identifier);

    if (!appointment) {
      throw new NoAppointmentsFoundError(appointmentId);
    }

    appointment.setStatus(AppointmentStatus.fromValue(status));
    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
