import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { NotificationEvent } from "../../shared/domain/events/NotificationEvent";

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
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

    const message = "Welcome to our platform! Your registration is complete.";

    const welcomeEvent = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(welcomeEvent);
  }
}
