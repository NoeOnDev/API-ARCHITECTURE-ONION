import { ContactStatus } from "./value-objects/ContactStatus";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class Contact {
  private id: Identifier;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone: string;
  private status: ContactStatus;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    status: ContactStatus = ContactStatus.LEAD,
    id?: Identifier
  ) {
    this.id = id || Identifier.create();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = status;
  }

  getId(): Identifier {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  promoteToUser(): void {
    this.status = ContactStatus.USER;
  }

  getStatus(): ContactStatus {
    return this.status;
  }
}
