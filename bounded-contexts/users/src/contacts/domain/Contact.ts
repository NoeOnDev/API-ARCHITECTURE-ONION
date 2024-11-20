import { ContactStatus } from "./value-objects/ContactStatus";
import { ContactHobby } from "./value-objects/ContactHobbit";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class Contact {
  private id: Identifier;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone: string;
  private status: ContactStatus;
  private hobby: ContactHobby;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    hobby: ContactHobby,
    status: ContactStatus = ContactStatus.LEAD,
    id?: Identifier
  ) {
    this.id = id || Identifier.create();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = status;
    this.hobby = hobby;
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

  getHobby(): ContactHobby {
    return this.hobby;
  }

  promoteToUser(): void {
    this.status = ContactStatus.USER;
  }

  getStatus(): ContactStatus {
    return this.status;
  }
}
