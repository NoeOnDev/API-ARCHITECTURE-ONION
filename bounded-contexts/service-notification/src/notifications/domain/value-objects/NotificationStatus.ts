import { InvalidNotificationStatusError } from "../../../_shared/domain/errors/InvalidNotificationStatusError";

export class NotificationStatus {
  private readonly value: "PENDING" | "SENT" | "FAILED";

  private constructor(value: "PENDING" | "SENT" | "FAILED") {
    this.value = value;
  }

  static PENDING = new NotificationStatus("PENDING");
  static SENT = new NotificationStatus("SENT");
  static FAILED = new NotificationStatus("FAILED");

  static from(value: string): NotificationStatus {
    switch (value) {
      case "PENDING":
        return NotificationStatus.PENDING;
      case "SENT":
        return NotificationStatus.SENT;
      case "FAILED":
        return NotificationStatus.FAILED;
      default:
        throw new InvalidNotificationStatusError(value);
    }
  }

  isPending(): boolean {
    return this.value === "PENDING";
  }

  isSent(): boolean {
    return this.value === "SENT";
  }

  isFailed(): boolean {
    return this.value === "FAILED";
  }

  getValue(): "PENDING" | "SENT" | "FAILED" {
    return this.value;
  }
}
