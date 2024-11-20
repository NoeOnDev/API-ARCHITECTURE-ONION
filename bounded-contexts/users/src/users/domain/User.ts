import { Contact } from "../../contacts/domain/Contact";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { UserRole } from "./value-objects/UserRole";

export class User {
  private id: Identifier;
  private username: string;
  private password: string;
  private contact: Contact;
  private verified: Date | null;
  private role: UserRole;

  constructor(
    username: string,
    password: string,
    contact: Contact,
    role: UserRole,
    id?: Identifier,
    verified: Date | null = null
  ) {
    this.id = id || Identifier.create();
    this.username = username;
    this.password = password;
    this.contact = contact;
    this.role = role;
    this.verified = verified;
  }

  getId(): Identifier {
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

  getRole(): UserRole {
    return this.role;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }

  getEmail(): string {
    return this.contact.getEmail();
  }

  getPhone(): string {
    return this.contact.getPhone();
  }

  getVerificationDate(): Date | null {
    return this.verified;
  }

  promoteToUser(): void {
    this.contact.promoteToUser();
  }

  isContactPromotedToUser(): boolean {
    return this.contact.getStatus().getValue() === "USER";
  }

  verifyUser(): void {
    this.verified = new Date();
  }

  isVerified(): boolean {
    return this.verified !== null;
  }

  updatePassword(newHashedPassword: string): void {
    this.password = newHashedPassword;
  }
}
