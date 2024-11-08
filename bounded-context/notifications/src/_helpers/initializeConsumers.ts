import { createRabbitMQChannel } from "../_config/rabbitmq.config";

import { UserCreatedConsumer } from "../notifications/infrastructure/consumers/UserCreatedConsumer";
import { ContactCreatedConsumer } from "../notifications/infrastructure/consumers/ContactCreatedConsumer";

import { generateTokenForUser } from "../tokens/infrastructure/dependencyInjection";
import { sendNotification } from "../notifications/infrastructure/dependencyInjection";

export const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const userCreatedConsumer = new UserCreatedConsumer(
    channel,
    generateTokenForUser,
    sendNotification
  );
  await userCreatedConsumer.consume();

  const contactCreatedConsumer = new ContactCreatedConsumer(
    channel,
    sendNotification
  );
  await contactCreatedConsumer.consume();
};
