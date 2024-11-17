import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string): Promise<void> {
    const identifier = Identifier.fromString(userId);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    user.verifyUser();
    const contact = user.getContact();
    contact.promoteToUser();

    await this.userRepository.save(user);
    await this.contactRepository.save(contact);

    const eventType = EventType.USER_VERIFICATION;
    const message = "Welcome to our platform! Your registration is complete.";
    const welcomeEvent = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "EMAIL",
      "NORMAL",
      eventType
    );

    await this.eventPublisher(welcomeEvent);
  }
}
