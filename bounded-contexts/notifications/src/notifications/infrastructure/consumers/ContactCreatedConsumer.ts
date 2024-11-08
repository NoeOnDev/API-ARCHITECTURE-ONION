import { Channel, ConsumeMessage } from "amqplib";
import { SendNotification } from "../../application/SendNotification";
import { NotificationChannel } from "../../domain/value-objects/NotificationChannel";

export class ContactCreatedConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly sendNotification: SendNotification
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("contact_created", { durable: true });

    this.channel.consume(
      "contact_created",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { contactId, email } = JSON.parse(msg.content.toString());
            console.log(
              `Received message from contact_created queue: contactId=${contactId}, email=${email}`
            );

            const message =
              "Welcome! Thank you for registering on our platform. Complete your registration to start enjoying our services.";

            await this.sendNotification.execute(
              contactId,
              "Contact",
              message,
              NotificationChannel.EMAIL,
              email
            );

            console.log(
              `Processed message from contact_created queue: contactId=${contactId}, email=${email}`
            );
            this.channel.ack(msg);
          } catch (error) {
            console.error(
              "Error processing message from contact_created queue:",
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
