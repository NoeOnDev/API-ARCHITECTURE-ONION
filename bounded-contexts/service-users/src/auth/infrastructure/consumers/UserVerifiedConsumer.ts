import { Channel, ConsumeMessage } from "amqplib";
import { VerifyUser } from "../../application/VerifyUser";
import { RepresentativeAlreadyExistsError } from "../../../_shared/domain/errors/RepresentativeAlreadyExistsError";

export class UserVerifiedConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly verifyUser: VerifyUser
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("user_service", { durable: true });

    this.channel.consume(
      "user_service",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { userId } = JSON.parse(msg.content.toString());
            console.log(`Processing user_verified event for userId=${userId}`);

            await this.verifyUser.execute(userId);

            console.log(`User verified successfully: userId=${userId}`);
            this.channel.ack(msg);
          } catch (error) {
            if (error instanceof RepresentativeAlreadyExistsError) {
              console.warn(
                `Conflict: Another representative already verified in locality. Skipping userId=${error.message}`
              );
              this.channel.ack(msg);
            } else {
              console.error("Error processing user_verified event:", error);
              this.channel.nack(msg, false, true);
            }
          }
        }
      },
      { noAck: false }
    );
  }
}
