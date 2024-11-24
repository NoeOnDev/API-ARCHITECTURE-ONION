import { InvalidContactStatusError } from "../../../_shared/domain/errors/InvalidContactStatusError";

export class ContactStatus {
  private readonly value: "LEAD" | "USER";

  private constructor(value: "LEAD" | "USER") {
    this.value = value;
  }

  static LEAD = new ContactStatus("LEAD");
  static USER = new ContactStatus("USER");

  static fromValue(value: string): ContactStatus {
    if (value !== "LEAD" && value !== "USER") {
      throw new InvalidContactStatusError(value);
    }
    return new ContactStatus(value as "LEAD" | "USER");
  }

  getValue(): "LEAD" | "USER" {
    return this.value;
  }
}
