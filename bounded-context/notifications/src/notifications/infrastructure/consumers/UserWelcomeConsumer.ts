import { Channel, ConsumeMessage } from "amqplib";
import { SendNotification } from "../../application/SendNotification";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";

export class UserWelcomeConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly sendNotification: SendNotification
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("user_welcome", { durable: true });

    this.channel.consume(
      "user_welcome",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { userId, email } = JSON.parse(msg.content.toString());
            console.log(`Processing user_welcome event for userId=${userId}`);

            const message = `Welcome to our platform! Your registration is complete.`;

            await this.sendNotification.execute(
              userId,
              "User",
              message,
              NotificationChannel.EMAIL,
              email
            );

            console.log(
              `User welcome message sent successfully: userId=${userId}`
            );
            this.channel.ack(msg);
          } catch (error) {
            console.error("Error processing user_welcome event:", error);
            this.channel.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );
  }
}
