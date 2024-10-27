import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { User } from "../../users/domain/User";

export class RegisterUser {
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
    if (!contact || contact.getStatus() !== "LEAD") {
      throw new Error("Contact not found or already registered as user");
    }

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) throw new Error("Username already exists");

    const user = new User(username, password, contact);
    await this.userRepository.save(user);
  }
}
