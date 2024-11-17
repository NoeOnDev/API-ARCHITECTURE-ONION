import { NotificationService } from "../../domain/services/NotificationService";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { twilioClient } from "../../../_config/twilio.config";
import { env } from "../../../_config/env.config";

export class TwilioNotificationService implements NotificationService {
  async send(
    channel: NotificationChannel,
    message: string,
    recipient: string
  ): Promise<void> {
    if (channel.isWhatsApp()) {
      await this.retry(
        async () => {
          await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${env.twilio.TWILIO_PHONE_NUMBER}`,
            to: `whatsapp:${recipient}`,
          });
        },
        3,
        1000
      );
    } else {
      throw new Error("Channel not supported");
    }
  }

  private async retry(
    fn: () => Promise<void>,
    retries: number,
    delay: number
  ): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await fn();
        return;
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
}
