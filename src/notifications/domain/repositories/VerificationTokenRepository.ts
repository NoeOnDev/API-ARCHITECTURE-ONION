import { NotificationChannel } from "../value-objects/NotificationChannel";
import { VerificationCode } from "../value-objects/VerificationCode";

export interface VerificationTokenRepository {
  save(
    userId: string,
    code: VerificationCode,
    channel: NotificationChannel
  ): Promise<void>;
  findValidCode(userId: string, code: string): Promise<VerificationCode | null>;
  invalidateCode(userId: string, code: string): Promise<void>;
}
