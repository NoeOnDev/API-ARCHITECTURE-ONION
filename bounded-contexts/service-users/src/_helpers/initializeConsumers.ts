import { createRabbitMQChannel } from "../_config/rabbitmq.config";

import { UserVerifiedConsumer } from "../auth/infrastructure/consumers/UserVerifiedConsumer";

import { verifyUser } from "../auth/infrastructure/dependencyInjection";

export const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const userVerifiedConsumer = new UserVerifiedConsumer(channel, verifyUser);

  await userVerifiedConsumer.consume();
};
