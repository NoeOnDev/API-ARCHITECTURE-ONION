import { Contact } from "../../contacts/domain/Contact";

export class User {
  private id: string;
  private username: string;
  private password: string;
  private contact: Contact;
  private verified: Date | null;

  constructor(
    username: string,
    password: string,
    contact: Contact,
    id?: string,
    verified: Date | null = null
  ) {
    this.id = id || crypto.randomUUID();
    this.username = username;
    this.password = password;
    this.contact = contact;
    this.verified = verified;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getContact(): Contact {
    return this.contact;
  }

  getEmail(): string {
    return this.contact.getEmail();
  }

  getPhone(): string {
    return this.contact.getPhone();
  }

  promoteToUser(): void {
    this.contact.promoteToUser();
  }

  isContactPromotedToUser(): boolean {
    return this.contact.getStatus() === "USER";
  }

  verifyUser(): void {
    this.verified = new Date();
  }

  isVerified(): boolean {
    return this.verified !== null;
  }

  getVerificationDate(): Date | null {
    return this.verified;
  }
}
