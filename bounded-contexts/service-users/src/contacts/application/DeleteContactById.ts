import { ContactRepository } from "../domain/ContactRepository";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";

export class DeleteContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    const identifier = Identifier.fromString(id);
    const contact = await this.contactRepository.findById(identifier);
    if (!contact) {
      throw new ContactNotFoundError();
    }
    await this.contactRepository.deleteById(identifier);
  }
}
