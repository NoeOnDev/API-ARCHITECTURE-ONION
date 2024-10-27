import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export class FindContactByEmail {
  constructor(private contactRepository: ContactRepository) {}

  async execute(email: string): Promise<Contact | null> {
    return this.contactRepository.findByEmail(email);
  }
}
