export class Contact {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private phone: string;
  private status: "LEAD" | "USER";

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    status: "LEAD" = "LEAD",
    id?: string
  ) {
    this.id = id || crypto.randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = status;
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

  promoteToUser(): void {
    this.status = "USER";
  }

  getStatus(): string {
    return this.status;
  }
}
