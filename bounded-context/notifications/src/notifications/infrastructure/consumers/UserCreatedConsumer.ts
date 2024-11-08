import { Channel, ConsumeMessage } from "amqplib";
import { GenerateTokenForUser } from "../../../tokens/application/GenerateTokenForUser";
import { SendNotification } from "../../application/SendNotification";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";

export class UserCreatedConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly generateTokenForUser: GenerateTokenForUser,
    private readonly sendNotification: SendNotification
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("user_created", { durable: true });

    this.channel.consume(
      "user_created",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { userId, phone } = JSON.parse(msg.content.toString());
            console.log(
              `Received message from user_created queue: userId=${userId}, phone=${phone}`
            );

            const token = await this.generateTokenForUser.execute(userId);
            const message = `Welcome to our platform! Your token is: ${token.getCode()}`;

            await this.sendNotification.execute(
              userId,
              "User",
              message,
              NotificationChannel.WHATSAPP,
              phone
            );

            console.log(
              `Processed message from user_created queue: userId=${userId}, phone=${phone}`
            );
            this.channel.ack(msg);
          } catch (error) {
            console.error(
              "Error processing message from user_created queue:",
              error
            );
            this.channel.nack(msg, false, true);
          }
        }
      },
      { noAck: false }
    );
  }
}
