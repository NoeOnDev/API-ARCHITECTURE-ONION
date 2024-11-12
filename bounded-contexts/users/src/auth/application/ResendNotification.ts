import { UserRepository } from "../../users/domain/UserRepository";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";

export class ResendNotification {
  constructor(
    private userRepository: UserRepository,
    private eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string, notificationType: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    let message: string;
    if (notificationType === "user_verification") {
      message =
        "Welcome! Here is your verification code to activate your account.";
    } else if (notificationType === "user_password_change") {
      message =
        "We have received your password change request. " +
        "You will receive a verification code shortly to proceed with the password change process. " +
        "Please follow the instructions to securely update your password.";
    } else {
      throw new Error("Invalid notification type");
    }

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
