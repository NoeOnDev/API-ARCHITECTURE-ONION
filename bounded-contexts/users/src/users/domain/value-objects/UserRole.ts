import { InvalidRoleError } from "../../../_shared/domain/errors/InvalidRoleError";

export class UserRole {
  private readonly value: "Citizen" | "Representative";

  private constructor(value: "Citizen" | "Representative") {
    this.value = value;
  }

  static readonly CITIZEN = new UserRole("Citizen");
  static readonly REPRESENTATIVE = new UserRole("Representative");

  static fromValue(value: string): UserRole {
    if (value !== "Citizen" && value !== "Representative") {
      throw new InvalidRoleError(value);
    }
    return new UserRole(value as "Citizen" | "Representative");
  }

  getValue(): "Citizen" | "Representative" {
    return this.value;
  }

  equals(other: UserRole): boolean {
    return this.value === other.getValue();
  }
}
