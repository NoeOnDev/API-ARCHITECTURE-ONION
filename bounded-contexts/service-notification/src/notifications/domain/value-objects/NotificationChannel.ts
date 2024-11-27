import { UnsupportedNotificationChannelError } from "../../../_shared/domain/errors/UnsupportedNotificationChannelError";

export class NotificationChannel {
  private readonly value: "EMAIL" | "WHATSAPP";

  private constructor(value: "EMAIL" | "WHATSAPP") {
    this.value = value;
  }

  static EMAIL = new NotificationChannel("EMAIL");
  static WHATSAPP = new NotificationChannel("WHATSAPP");

  static from(value: string): NotificationChannel {
    switch (value) {
      case "EMAIL":
        return NotificationChannel.EMAIL;
      case "WHATSAPP":
        return NotificationChannel.WHATSAPP;
      default:
        throw new UnsupportedNotificationChannelError(value);
    }
  }

  isEmail(): boolean {
    return this.value === "EMAIL";
  }

  isWhatsApp(): boolean {
    return this.value === "WHATSAPP";
  }

  getValue(): "EMAIL" | "WHATSAPP" {
    return this.value;
  }
}
