import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";

export class FindContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<Contact> {
    const identifier = Identifier.fromString(id);
    const contact = await this.contactRepository.findById(identifier);
    if (!contact) {
      throw new ContactNotFoundError();
    }
    return contact;
  }
}
