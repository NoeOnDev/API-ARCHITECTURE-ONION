import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { twilioClient } from "../../../_config/twilio.config";
import { env } from "../../../_config/env.config";
import { TwilioNotificationError } from "../../../_shared/domain/errors/TwilioNotificationError";
import { UnsupportedChannelError } from "../../../_shared/domain/errors/UnsupportedChannelError";

export class TwilioNotificationService {
  async send(
    channel: NotificationChannel,
    message: string,
    recipient: string
  ): Promise<void> {
    if (channel.isWhatsApp()) {
      try {
        const formattedRecipient = this.formatRecipientNumber(recipient);
        console.log(`Sending WhatsApp message to ${formattedRecipient}`);
        await this.retry(
          async () => {
            await twilioClient.messages.create({
              body: message,
              from: `whatsapp:${env.twilio.TWILIO_PHONE_NUMBER}`,
              to: `whatsapp:${formattedRecipient}`,
            });
          },
          10,
          1000
        );
      } catch (error) {
        if (error instanceof Error) {
          throw new TwilioNotificationError(error.message);
        } else {
          throw new TwilioNotificationError(String(error));
        }
      }
    } else {
      throw new UnsupportedChannelError(channel.getValue());
    }
  }

  private formatRecipientNumber(recipient: string): string {
    const countryCode = recipient.slice(0, 3);
    const restOfNumber = recipient.slice(3);
    return `${countryCode}1${restOfNumber}`;
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
