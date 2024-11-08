import { UserCreatedEvent } from "../../domain/events/UserCreatedEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisher(
  event: UserCreatedEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    userId: event.userId,
    email: event.email,
    phone: event.phone,
  };
  channel.assertQueue("user_created", { durable: true });
  channel.sendToQueue(
    "user_created",
    Buffer.from(JSON.stringify(eventPayload)),
    {
      persistent: true,
    }
  );
}
