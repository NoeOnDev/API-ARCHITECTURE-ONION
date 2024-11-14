import { ContactRepository } from "../domain/ContactRepository";
import { ContactNotFoundError } from "../../_shared/domain/errors/ContactNotFoundError";

export class DeleteContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      throw new ContactNotFoundError();
    }
    await this.contactRepository.deleteById(id);
  }
}
