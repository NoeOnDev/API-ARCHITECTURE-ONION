import { NotificationRepository } from "../domain/NotificationRepository";
import { Notification } from "../domain/Notification";
import { NotificationChannel } from "../domain/value-objects/NotificationChannel";
import { NotificationStatus } from "../domain/value-objects/NotificationStatus";
import mongoose, { Document, Schema } from "mongoose";

interface NotificationDocument extends Document {
  id: string;
  userId: string;
  channel: string;
  message: string;
  status: string;
  createdAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  channel: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  notificationSchema
);

export class MongoNotificationRepository implements NotificationRepository {
  async save(notification: Notification): Promise<void> {
    await NotificationModel.findOneAndUpdate(
      { id: notification.getId() },
      {
        userId: notification.getUserId(),
        channel: notification.getChannel().getValue(),
        message: notification.getMessage(),
        status: notification.getStatus().getValue(),
        createdAt: notification.getCreatedAt(),
      },
      { upsert: true, new: true }
    ).exec();
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const notificationDocuments = await NotificationModel.find({
      userId,
    }).exec();
    return notificationDocuments.map(this.mapDocumentToNotification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notificationDocument = await NotificationModel.findOne({ id }).exec();
    return notificationDocument
      ? this.mapDocumentToNotification(notificationDocument)
      : null;
  }

  private mapDocumentToNotification(
    notificationDocument: NotificationDocument
  ): Notification {
    return new Notification(
      notificationDocument.userId,
      NotificationChannel.from(notificationDocument.channel),
      notificationDocument.message,
      NotificationStatus.from(notificationDocument.status),
      notificationDocument.id,
      notificationDocument.createdAt
    );
  }
}
