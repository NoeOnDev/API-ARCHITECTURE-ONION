import { NotificationRepository } from "../domain/NotificationRepository";
import { NotificationService } from "../domain/services/NotificationService";
import { NotificationChannel } from "../domain/value-objects/NotificationChannel";
import { NotificationStatus } from "../domain/value-objects/NotificationStatus";
import { Notification } from "../domain/Notification";
import { Identifier } from "../../_shared/domain/value-objects/Identifier";

export class SendNotification {
  constructor(
    private notificationRepository: NotificationRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    recipientId: string,
    recipientType: "User" | "Contact",
    message: string,
    channel: NotificationChannel,
    recipient: string
  ): Promise<void> {
    const identifier = Identifier.fromString(recipientId);
    const notification = new Notification(
      identifier,
      recipientType,
      channel,
      message,
      NotificationStatus.PENDING
    );

    await this.notificationRepository.save(notification);

    try {
      await this.notificationService.send(channel, message, recipient);
      notification.markAsSent();
      console.log(
        `Notification sent successfully to ${recipient} via ${channel.getValue()}`
      );
    } catch (error) {
      notification.markAsFailed();
      console.error(
        `Failed to send notification to ${recipient} via ${channel.getValue()}:`,
        error
      );
    }

    await this.notificationRepository.save(notification);
  }
}
