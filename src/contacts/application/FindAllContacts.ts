import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export class FindAllContacts {
  constructor(private contactRepository: ContactRepository) {}

  async execute(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }
}
