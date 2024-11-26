import { InvalidAppointmentStatusError } from "../../../_shared/domain/errors/InvalidAppointmentStatusError";

export class AppointmentStatus {
  private readonly value: "ACCEPTED" | "PENDING" | "REJECTED";

  private constructor(value: "ACCEPTED" | "PENDING" | "REJECTED") {
    this.value = value;
  }

  static ACCEPTED = new AppointmentStatus("ACCEPTED");
  static PENDING = new AppointmentStatus("PENDING");
  static REJECTED = new AppointmentStatus("REJECTED");

  static fromValue(value: string): AppointmentStatus {
    switch (value) {
      case "ACCEPTED":
        return AppointmentStatus.ACCEPTED;
      case "PENDING":
        return AppointmentStatus.PENDING;
      case "REJECTED":
        return AppointmentStatus.REJECTED;
      default:
        throw new InvalidAppointmentStatusError(value);
    }
  }

  getValue(): string {
    return this.value;
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isAccepted(): boolean {
    return this.value === "ACCEPTED";
  }

  isRejected(): boolean {
    return this.value === "REJECTED";
  }
}
