import { InvalidEventTypeError } from "../errors/InvalidEventTypeError";

export class EventType {
  private readonly value:
    | "user_verification"
    | "user_password_change"
    | "user_authentication"
    | "user_password_updated"
    | "user_verified"
    | "contact_saved";

  private constructor(value: string) {
    if (!EventType.isValid(value)) {
      throw new InvalidEventTypeError(value);
    }
    this.value = value as
      | "user_verification"
      | "user_password_change"
      | "user_authentication"
      | "user_password_updated"
      | "user_verified"
      | "contact_saved";
  }

  static USER_VERIFICATION = new EventType("user_verification");
  static USER_PASSWORD_CHANGE = new EventType("user_password_change");
  static USER_AUTHENTICATION = new EventType("user_authentication");
  static USER_PASSWORD_UPDATED = new EventType("user_password_updated");
  static USER_VERIFIED = new EventType("user_verified");
  static CONTACT_SAVED = new EventType("contact_saved");

  static isValid(value: string): boolean {
    return [
      "user_verification",
      "user_password_change",
      "user_authentication",
      "user_password_updated",
      "user_verified",
      "contact_saved",
    ].includes(value);
  }

  static fromString(value: string): EventType {
    return new EventType(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: EventType): boolean {
    return this.value === other.getValue();
  }
}
