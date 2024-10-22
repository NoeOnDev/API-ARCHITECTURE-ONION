import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export class SaveContact {
  constructor(private contactRepository: ContactRepository) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ): Promise<Contact> {
    const contact = new Contact(firstName, lastName, email, phone);
    await this.contactRepository.save(contact);
    return contact;
  }
}
