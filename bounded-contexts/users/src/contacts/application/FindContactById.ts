import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";

export class FindContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new ContactNotFoundError();
    }
    return contact;
  }
}
