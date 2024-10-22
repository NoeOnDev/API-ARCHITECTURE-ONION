export class Contact {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  getId(): string {
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
}
