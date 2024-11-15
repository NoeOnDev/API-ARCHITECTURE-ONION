import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";
import { NotificationType } from "../../_shared/domain/NotificationType";
import { NotificationMessageProvider } from "../../_shared/domain/NotificationMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";

export class ResendNotification {
  constructor(
    private userRepository: UserRepository,
    private messageProvider: NotificationMessageProvider,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(
    userId: string,
    notificationType: NotificationType
  ): Promise<void> {
    const identifier = Identifier.fromString(userId);
    const user = await this.userRepository.findById(identifier);
    if (!user) {
      throw new UserNotFoundError();
    }

    const message = this.messageProvider.getMessage(notificationType);
    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "WHATSAPP",
      "2FA"
    );

    await this.eventPublisher(event);
  }
}
