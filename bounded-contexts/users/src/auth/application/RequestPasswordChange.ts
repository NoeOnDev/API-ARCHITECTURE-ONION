import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { EventType } from "../../_shared/domain/value-objects/EventType";
import { EventMessageProvider } from "../domain/EventMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class RequestPasswordChange {
  constructor(
    private userRepository: UserRepository,
    private messageProvider: EventMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }

    if (!user.isVerified()) {
      throw new AccountNotVerifiedError();
    }

    const eventType = EventType.USER_PASSWORD_CHANGE;
    const message = this.messageProvider.getMessage(eventType);

    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "WHATSAPP",
      "2FA",
      eventType
    );

    await this.eventPublisher(event);

    return user.getId().getValue();
  }
}
