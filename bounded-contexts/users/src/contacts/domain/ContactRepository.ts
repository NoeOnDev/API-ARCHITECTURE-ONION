import { Contact } from "./Contact";

export interface ContactRepository {
  save(contact: Contact): Promise<void>;
  findAll(): Promise<Contact[]>;
  findById(id: string): Promise<Contact | null>;
  findByEmail(email: string): Promise<Contact | null>;
  deleteById(id: string): Promise<void>;
}
