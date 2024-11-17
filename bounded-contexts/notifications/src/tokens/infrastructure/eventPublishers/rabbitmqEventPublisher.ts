import { UserVerifiedEvent } from "../../domain/events/UserVerifiedEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisher(
  event: UserVerifiedEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    userId: event.userId,
  };

  await channel.assertQueue("user_service", { durable: true });
  channel.sendToQueue(
    "user_service",
    Buffer.from(JSON.stringify(eventPayload)),
    {
      persistent: true,
    }
  );
}
