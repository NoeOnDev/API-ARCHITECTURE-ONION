import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { NotificationType } from "../domain/NotificationType";
import { NotificationMessageProvider } from "../domain/NotificationMessageProvider";
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
    const user = await this.userRepository.findById(userId);
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
