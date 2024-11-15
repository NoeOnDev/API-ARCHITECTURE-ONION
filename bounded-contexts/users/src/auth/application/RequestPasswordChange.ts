import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { NotificationType } from "../domain/NotificationType";
import { NotificationMessageProvider } from "../domain/NotificationMessageProvider";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class RequestPasswordChange {
  constructor(
    private userRepository: UserRepository,
    private messageProvider: NotificationMessageProvider,
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

    const message = this.messageProvider.getMessage(
      NotificationType.USER_PASSWORD_CHANGE
    );

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

    return user.getId().getValue();
  }
}
