import { ContactRepository } from "../domain/ContactRepository";

export class DeleteContactById {
  constructor(private contactRepository: ContactRepository) {}

  async execute(id: string): Promise<void> {
    await this.contactRepository.deleteById(id);
  }
}
