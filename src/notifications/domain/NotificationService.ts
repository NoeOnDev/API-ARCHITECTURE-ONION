import { NotificationChannel } from "./NotificationChannel";
import { VerificationCode } from "./VerificationCode";

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
