import { NotificationChannel } from "./value-objects/NotificationChannel";
import { NotificationStatus } from "./value-objects/NotificationStatus";

export class Notification {
  private id: string;
  private userId: string;
  private channel: NotificationChannel;
  private message: string;
  private status: NotificationStatus;
  private createdAt: Date;

  constructor(
    userId: string,
    channel: NotificationChannel,
    message: string,
    status: NotificationStatus = NotificationStatus.PENDING,
    id?: string,
    createdAt?: Date
  ) {
    this.id = id || crypto.randomUUID();
    this.userId = userId;
    this.channel = channel;
    this.message = message;
    this.status = status;
    this.createdAt = createdAt || new Date();
  }

  markAsSent(): void {
    this.status = NotificationStatus.SENT;
  }

  markAsFailed(): void {
    this.status = NotificationStatus.FAILED;
  }

  isPending(): boolean {
    return this.status.isPending();
  }

  getId(): string {
    return this.id;
  }

  getUserId(): string {
    return this.userId;
  }

  getChannel(): NotificationChannel {
    return this.channel;
  }

  getMessage(): string {
    return this.message;
  }

  getStatus(): NotificationStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
