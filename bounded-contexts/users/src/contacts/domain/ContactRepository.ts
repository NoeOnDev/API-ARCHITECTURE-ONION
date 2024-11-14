import { Contact } from "./Contact";
import { ContactStatus } from "./value-objects/ContactStatus";

export interface ContactRepository {
  save(contact: Contact): Promise<void>;
  findAll(): Promise<Contact[]>;
  findById(id: string): Promise<Contact | null>;
  findByEmail(email: string): Promise<Contact | null>;
  findByEmailAndStatus(
    email: string,
    status: ContactStatus
  ): Promise<Contact | null>;
  deleteById(id: string): Promise<void>;
}
