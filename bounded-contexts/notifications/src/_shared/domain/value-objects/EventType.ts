import { InvalidEventTypeError } from "../errors/InvalidEventTypeError";

export class EventType {
  private readonly value:
    | "user_verification"
    | "user_password_change"
    | "user_authenticate";

  private constructor(value: string) {
    if (!EventType.isValid(value)) {
      throw new InvalidEventTypeError(value);
    }
    this.value = value as
      | "user_verification"
      | "user_password_change"
      | "user_authenticate";
  }

  static USER_VERIFICATION = new EventType("user_verification");
  static USER_PASSWORD_CHANGE = new EventType("user_password_change");
  static USER_AUTHENTICATE = new EventType("user_authenticate");

  static isValid(value: string): boolean {
    return [
      "user_verification",
      "user_password_change",
      "user_authenticate",
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
