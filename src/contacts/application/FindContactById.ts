import { Contact } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export class FindContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<Contact | null> {
    return this.contactRepository.findById(id);
  }
}
