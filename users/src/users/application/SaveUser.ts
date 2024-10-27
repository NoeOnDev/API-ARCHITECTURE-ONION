import { UserRepository } from "../domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { User } from "../domain/User";

export class SaveUser {
  constructor(
    private userRepository: UserRepository,
    private contactRepository: ContactRepository
  ) {}

  async execute(
    contactId: string,
    username: string,
    password: string
  ): Promise<void> {
    const contact = await this.contactRepository.findById(contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    const user = new User(username, password, contact);
    await this.userRepository.save(user);
  }
}
