import { UserRepository } from "../../users/domain/UserRepository";
import { ContactRepository } from "../../contacts/domain/ContactRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { RepresentativeAlreadyExistsError } from "../../_shared/domain/errors/RepresentativeAlreadyExistsError";
import { UserRole } from "../../users/domain/value-objects/UserRole";

export class VerifyUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly contactRepository: ContactRepository,
    private readonly messageProvider: EventMessageProvider,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string): Promise<void> {
    const identifier = Identifier.fromString(userId);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    const userRole = user.getRole();

    if (userRole.equals(UserRole.REPRESENTATIVE)) {
      const representativesInLocality =
        await this.userRepository.findByRoleAndLocality(
          userRole,
          user.getAddress().getLocality()
        );

      const verifiedRepresentative = representativesInLocality.find((rep) =>
        rep.isVerified()
      );
      if (verifiedRepresentative) {
        throw new RepresentativeAlreadyExistsError(
          user.getAddress().getLocality()
        );
      }
    }

    user.verifyUser();
    const contact = user.getContact();
    contact.promoteToUser();

    await this.userRepository.save(user);
    await this.contactRepository.save(contact);

    const eventType = EventType.USER_VERIFIED;
    const message = this.messageProvider.getMessage(eventType);

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
