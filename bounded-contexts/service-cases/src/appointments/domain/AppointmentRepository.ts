import { Appointment } from "./Appointment";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(id: Identifier): Promise<Appointment | null>;
  findByUserId(userId: Identifier): Promise<Appointment[]>;
  findByLocality(locality: string): Promise<Appointment[]>;
  findByDateTimeRange(start: Date, end: Date): Promise<Appointment[]>;
  deleteById(id: Identifier): Promise<void>;
}
