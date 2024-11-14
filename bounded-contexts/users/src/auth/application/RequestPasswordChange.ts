import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";
import { UserNotFoundError } from "../../_shared/domain/errors/UserNotFoundError";
import { AccountNotVerifiedError } from "../../_shared/domain/errors/AccountNotVerifiedError";

export class RequestPasswordChange {
  constructor(
    private userRepository: UserRepository,
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

    const message =
      "We have received your password change request. " +
      "You will receive a verification code shortly to proceed with the password change process. " +
      "Please follow the instructions to securely update your password.";

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

    return user.getId();
  }
}
