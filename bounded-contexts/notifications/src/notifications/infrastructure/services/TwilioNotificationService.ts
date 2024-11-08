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
      await twilioClient.messages.create({
        body: message,
        from: `whatsapp:${env.twilio.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${recipient}`,
      });
    } else {
      throw new Error("Channel not supported");
    }
  }
}
