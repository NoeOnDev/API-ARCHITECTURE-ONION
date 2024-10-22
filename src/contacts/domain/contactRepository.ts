import { Contact } from "./contact";

export interface ContactRepository {
  save(contact: Contact): Promise<void>;
  findAll(): Promise<Contact[]>;
  findById(id: string): Promise<Contact | null>;
  deleteById(id: string): Promise<void>;
}
