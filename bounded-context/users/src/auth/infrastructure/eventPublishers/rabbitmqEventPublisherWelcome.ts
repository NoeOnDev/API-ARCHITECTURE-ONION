import { UserWelcomeEvent } from "../../domain/events/UserWelcomeEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisherWelcome(
  event: UserWelcomeEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    userId: event.userId,
    email: event.email,
    phone: event.phone,
  };

  await channel.assertQueue("user_welcome", { durable: true });
  channel.sendToQueue(
    "user_welcome",
    Buffer.from(JSON.stringify(eventPayload)),
    {
      persistent: true,
    }
  );
}
