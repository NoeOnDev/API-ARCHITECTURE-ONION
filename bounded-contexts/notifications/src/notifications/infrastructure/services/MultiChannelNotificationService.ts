import { NotificationService } from "../../domain/services/NotificationService";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { TwilioNotificationService } from "./TwilioNotificationService";
import { EmailNotificationService } from "./EmailNotificationService";

export class MultiChannelNotificationService implements NotificationService {
  constructor(
    private readonly whatsappService: TwilioNotificationService,
    private readonly emailService: EmailNotificationService
  ) {}

  async send(
    channel: NotificationChannel,
    message: string,
    recipient: string
  ): Promise<void> {
    if (channel.isWhatsApp()) {
      await this.whatsappService.send(channel, message, recipient);
    } else if (channel.isEmail()) {
      await this.emailService.send(channel, message, recipient);
    } else {
      throw new Error("Channel not supported");
    }
  }
}
