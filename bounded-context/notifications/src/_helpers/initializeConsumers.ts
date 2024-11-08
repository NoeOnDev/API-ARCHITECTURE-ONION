import { createRabbitMQChannel } from "../_config/rabbitmq.config";

import { UserCreatedConsumer } from "../notifications/infrastructure/consumers/UserCreatedConsumer";
import { ContactCreatedConsumer } from "../notifications/infrastructure/consumers/ContactCreatedConsumer";
import { UserWelcomeConsumer } from "../notifications/infrastructure/consumers/UserWelcomeConsumer";

import { generateTokenForUser } from "../tokens/infrastructure/dependencyInjection";
import { sendNotification } from "../notifications/infrastructure/dependencyInjection";

export const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const userCreatedConsumer = new UserCreatedConsumer(
    channel,
    generateTokenForUser,
    sendNotification
  );

  const contactCreatedConsumer = new ContactCreatedConsumer(
    channel,
    sendNotification
  );

  const userWelcomeConsumer = new UserWelcomeConsumer(
    channel,
    sendNotification
  );

  await userCreatedConsumer.consume();
  await contactCreatedConsumer.consume();
  await userWelcomeConsumer.consume();
};
