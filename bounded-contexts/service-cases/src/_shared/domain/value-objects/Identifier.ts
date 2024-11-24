import { InvalidIdentifierError } from "../errors/InvalidIdentifierError";

export class Identifier {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(): Identifier {
    return new Identifier(crypto.randomUUID());
  }

  static fromString(id: string): Identifier {
    if (!this.isValidUuidV4(id)) {
      throw new InvalidIdentifierError(id);
    }
    return new Identifier(id);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Identifier): boolean {
    return this.value === other.getValue();
  }

  private static isValidUuidV4(id: string): boolean {
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidV4Regex.test(id);
  }
}
