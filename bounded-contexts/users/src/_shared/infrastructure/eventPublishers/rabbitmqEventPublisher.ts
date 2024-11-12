import { NotificationEvent } from "../../domain/events/NotificationEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisher(
  event: NotificationEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    identifier: event.identifier,
    recipientType: event.recipientType,
    email: event.email,
    phone: event.phone,
    message: event.message,
    channel: event.channel,
    type: event.type,
  };

  await channel.assertQueue("service_notification", { durable: true });
  channel.sendToQueue(
    "service_notification",
    Buffer.from(JSON.stringify(eventPayload)),
    {
      persistent: true,
    }
  );
}
