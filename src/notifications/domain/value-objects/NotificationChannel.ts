export class NotificationChannel {
  private readonly channel: string;

  private static readonly VALID_CHANNELS = ["SMS", "EMAIL", "WHATSAPP"];

  constructor(channel: string) {
    this.ensureIsValidChannel(channel);
    this.channel = channel.toUpperCase();
  }

  private ensureIsValidChannel(channel: string): void {
    if (!NotificationChannel.VALID_CHANNELS.includes(channel.toUpperCase())) {
      throw new Error(
        `Invalid notification channel: ${channel}. Valid channels are: ${NotificationChannel.VALID_CHANNELS.join(
          ", "
        )}`
      );
    }
  }

  getChannel(): string {
    return this.channel;
  }

  static sms(): NotificationChannel {
    return new NotificationChannel("SMS");
  }

  static email(): NotificationChannel {
    return new NotificationChannel("EMAIL");
  }

  static whatsapp(): NotificationChannel {
    return new NotificationChannel("WHATSAPP");
  }

  equals(other: NotificationChannel): boolean {
    return this.channel === other.getChannel();
  }
}
