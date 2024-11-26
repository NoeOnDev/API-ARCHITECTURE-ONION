import { AppointmentRepository } from "../domain/AppointmentRepository";
import { Appointment } from "../domain/Appointment";
import { NoAppointmentsFoundError } from "../../_shared/domain/errors/NoAppointmentsFoundError";

export class FindAppointmentsByLocality {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(locality: string): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findByLocality(
      locality
    );

    if (appointments.length === 0) {
      throw new NoAppointmentsFoundError(locality);
    }

    return appointments;
  }
}
