import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";

export class FindContactByEmail {
  constructor(private contactRepository: ContactRepository) {}

  async execute(email: string): Promise<Contact> {
    const contact = await this.contactRepository.findByEmail(email);
    if (!contact) {
      throw new ContactNotFoundError();
    }
    return contact;
  }
}
