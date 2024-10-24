import { NotificationChannel } from "./value-objects/NotificationChannel";
import { VerificationCode } from "./value-objects/VerificationCode";

export interface NotificationService {
  sendVerificationCode(
    userId: string,
    code: VerificationCode,
    channel: NotificationChannel
  ): Promise<void>;

  sendWelcomeMessage(
    userId: string,
    channel: NotificationChannel
  ): Promise<void>;
}
