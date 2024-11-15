import { Contact } from "./Contact";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export interface ContactRepository {
  save(contact: Contact): Promise<void>;
  findAll(): Promise<Contact[]>;
  findById(id: Identifier): Promise<Contact | null>;
  findByEmail(email: string): Promise<Contact | null>;
  deleteById(id: Identifier): Promise<void>;
}
