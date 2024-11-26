import { AppointmentRepository } from "../domain/AppointmentRepository";
import { Appointment } from "../domain/Appointment";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(
    userId: string,
    title: string,
    userName: string,
    description: string,
    dateTime: Date,
    locality: string
  ): Promise<Appointment> {
    const identifier = Identifier.fromString(userId);

    const appointment = new Appointment(
      title,
      userName,
      identifier,
      description,
      dateTime,
      locality
    );

    await this.appointmentRepository.save(appointment);
    return appointment;
  }
}
