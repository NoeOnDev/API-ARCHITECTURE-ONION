import { TextMiningEvent } from "../../domain/events/TextMiningEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisher(
  event: TextMiningEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    entityId: event.entityId.getValue(),
    entityType: event.entityType,
    title: event.title,
    description: event.description,
  };

  await channel.assertQueue("text_mining_service", { durable: true });
  channel.sendToQueue(
    "text_mining_service",
    Buffer.from(JSON.stringify(eventPayload)),
    { persistent: true }
  );
}
