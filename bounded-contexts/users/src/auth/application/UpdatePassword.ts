import { UserRepository } from "../../users/domain/UserRepository";
import { HashService } from "../domain/services/HashService";
import { NotificationEvent } from "../../_shared/domain/events/NotificationEvent";

export class UpdatePassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly eventPublisher: (event: NotificationEvent) => Promise<void>
  ) {}

  async execute(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (!user.isVerified()) {
      throw new Error("User not verified");
    }

    const hashedPassword = await this.hashService.hash(newPassword);
    user.updatePassword(hashedPassword);
    await this.userRepository.save(user);

    const message =
      "Your password has been successfully updated. " +
      "This change was made from your account at " +
      new Date().toLocaleString() +
      ". " +
      "If you did not make this change, please contact our support team immediately.";

    const event = new NotificationEvent(
      user.getId(),
      "User",
      user.getEmail(),
      user.getPhone(),
      message,
      "EMAIL",
      "NORMAL"
    );

    await this.eventPublisher(event);
  }
}
