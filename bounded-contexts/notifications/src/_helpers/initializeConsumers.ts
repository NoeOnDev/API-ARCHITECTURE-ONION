import { createRabbitMQChannel } from "../_config/rabbitmq.config";

import { ServiceNotificationConsumer } from "../notifications/infrastructure/consumers/ServiceNotificationConsumer";

import { generateTokenForUser } from "../tokens/infrastructure/dependencyInjection";
import { sendNotification } from "../notifications/infrastructure/dependencyInjection";

export const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const serviceNotificationConsumer = new ServiceNotificationConsumer(
    channel,
    generateTokenForUser,
    sendNotification
  );

  await serviceNotificationConsumer.consume();
};
