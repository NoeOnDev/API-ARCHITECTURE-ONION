import { InvalidHobbyError } from "../../../_shared/domain/errors/InvalidHobbyError";

export class ContactHobby {
  private readonly value: string;

  private static readonly validHobbies = [
    "Chef",
    "Merchandise Trade",
    "Craftsman",
    "Community Volunteering",
    "Arts and Culture Promotion",
    "Community Educator",
    "Health and Wellness",
    "None",
  ];

  private constructor(value: string) {
    if (!ContactHobby.isValid(value)) {
      throw new InvalidHobbyError(value);
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    return this.validHobbies.includes(value);
  }

  static fromString(value: string): ContactHobby {
    return new ContactHobby(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: ContactHobby): boolean {
    return this.value === other.getValue();
  }
}
