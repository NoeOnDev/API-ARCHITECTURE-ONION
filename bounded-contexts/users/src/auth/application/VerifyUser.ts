import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { UserWelcomeEvent } from "../domain/events/UserWelcomeEvent";

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository,
    private readonly eventPublisher: (event: UserWelcomeEvent) => Promise<void>
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.verifyUser();

    const contact = user.getContact();
    contact.promoteToUser();

    await this.userRepository.save(user);
    await this.contactRepository.save(contact);

    const welcomeEvent = new UserWelcomeEvent(
      user.getId(),
      user.getEmail(),
      user.getPhone()
    );
    await this.eventPublisher(welcomeEvent);
  }
}
