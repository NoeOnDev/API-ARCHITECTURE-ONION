import { ContactCreatedEvent } from "../../domain/events/ContactCreatedEvent";
import { createRabbitMQChannel } from "../../../_config/rabbitmq.config";

export async function rabbitmqEventPublisher(
  event: ContactCreatedEvent
): Promise<void> {
  const channel = await createRabbitMQChannel();
  const eventPayload = {
    contactId: event.contactId,
    email: event.email,
    phone: event.phone,
  };

  await channel.assertQueue("contact_created", { durable: true });
  channel.sendToQueue(
    "contact_created",
    Buffer.from(JSON.stringify(eventPayload)),
    {
      persistent: true,
    }
  );
}
