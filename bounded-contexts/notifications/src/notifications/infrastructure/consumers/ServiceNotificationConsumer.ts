import { Channel, ConsumeMessage } from "amqplib";
import { GenerateTokenForUser } from "../../../tokens/application/GenerateTokenForUser";
import { SendNotification } from "../../application/SendNotification";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";
import { EventType } from "../../../_shared/domain/value-objects/EventType";
import { Identifier } from "../../../_shared/domain/value-objects/Identifier";

export class ServiceNotificationConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly generateTokenForUser: GenerateTokenForUser,
    private readonly sendNotification: SendNotification
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("service_notification", { durable: true });

    this.channel.consume(
      "service_notification",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const {
              identifier: rawIdentifier,
              recipientType,
              email,
              phone,
              message,
              channel,
              type,
              eventType,
            } = JSON.parse(msg.content.toString());

            const identifier = Identifier.fromString(rawIdentifier);
            const eventTypeObj = EventType.fromString(eventType);

            let finalMessage = message;
            const notificationChannel = NotificationChannel.from(channel);

            if (type === "2FA") {
              const token = await this.generateTokenForUser.execute(
                identifier.getValue(),
                eventTypeObj.getValue()
              );
              finalMessage = `${message}. Your verification code is: ${token.getCode()}`;
            }

            const recipient = notificationChannel.isWhatsApp() ? phone : email;

            await this.sendNotification.execute(
              identifier.getValue(),
              recipientType,
              finalMessage,
              notificationChannel,
              recipient
            );

            console.log(
              `Processed notification: identifier=${identifier.getValue()}, channel=${channel}`
            );
            this.channel.ack(msg);
          } catch (error) {
            console.error("Error processing notification:", error);
            this.channel.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );
  }
}
