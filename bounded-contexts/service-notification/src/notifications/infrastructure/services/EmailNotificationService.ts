import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { transporter } from "../../../_config/transporter.config";
import { env } from "../../../_config/env.config";
import { EmailNotificationError } from "../../../_shared/domain/errors/EmailNotificationError";
import { UnsupportedChannelError } from "../../../_shared/domain/errors/UnsupportedChannelError";

export class EmailNotificationService {
  async send(
    channel: NotificationChannel,
    message: string,
    recipient: string
  ): Promise<void> {
    if (channel.isEmail()) {
      try {
        await transporter.sendMail({
          from: env.email.EMAIL_USER,
          to: recipient,
          subject: "Notification from our platform",
          text: message,
        });
      } catch (error) {
        if (error instanceof Error) {
          throw new EmailNotificationError(error.message);
        } else {
          throw new EmailNotificationError(String(error));
        }
      }
    } else {
      throw new UnsupportedChannelError(channel.getValue());
    }
  }
}
