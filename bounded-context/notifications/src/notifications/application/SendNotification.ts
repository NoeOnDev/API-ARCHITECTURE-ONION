import { NotificationRepository } from "../domain/NotificationRepository";
import { NotificationService } from "../domain/services/NotificationService";
import { NotificationChannel } from "../domain/value-objects/NotificationChannel";
import { NotificationStatus } from "../domain/value-objects/NotificationStatus";
import { Notification } from "../domain/Notification";

export class SendNotification {
  constructor(
    private notificationRepository: NotificationRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    userId: string,
    message: string,
    channel: NotificationChannel
  ): Promise<void> {
    const notification = new Notification(
      userId,
      channel,
      message,
      NotificationStatus.PENDING
    );

    await this.notificationRepository.save(notification);

    try {
      await this.notificationService.send(channel, message);

      notification.markAsSent();
    } catch (error) {
      notification.markAsFailed();
    }
    
    await this.notificationRepository.save(notification);
  }
}
