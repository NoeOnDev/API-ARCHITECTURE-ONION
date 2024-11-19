import { UserRepository } from "../../users/domain/UserRepository";
import { HashService } from "../domain/services/HashService";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class UpdatePassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly messageProvider: EventMessageProvider,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string, newPassword: string): Promise<void> {
    const identifier = Identifier.fromString(userId);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.isVerified()) {
      throw new AccountNotVerifiedError();
    }

    const hashedPassword = await this.hashService.hash(newPassword);
    user.updatePassword(hashedPassword);
    await this.userRepository.save(user);

    const eventType = EventType.USER_PASSWORD_UPDATED;
    const message = this.messageProvider.getMessage(eventType);

    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "EMAIL",
      "NORMAL",
      eventType
    );

    await this.eventPublisher(event);
  }
}
