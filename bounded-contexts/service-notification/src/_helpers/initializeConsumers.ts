import { createRabbitMQChannel } from "../_config/rabbitmq.config";
import { ServiceNotificationConsumer } from "../notifications/infrastructure/consumers/ServiceNotificationConsumer";
import { generateTokenForUser } from "../tokens/infrastructure/dependencyInjection";
import { sendNotification } from "../notifications/infrastructure/dependencyInjection";

export const initializeConsumers = async (retries: number, delay: number) => {
  for (let i = 0; i < retries; i++) {
    try {
      const channel = await createRabbitMQChannel();

      const serviceNotificationConsumer = new ServiceNotificationConsumer(
        channel,
        generateTokenForUser,
        sendNotification
      );

      await serviceNotificationConsumer.consume();
      console.log("RabbitMQ consumer initialized successfully ✅");
      return;
    } catch (error) {
      console.error(
        `Error initializing RabbitMQ consumer (attempt ${
          i + 1
        } of ${retries}): ❗`,
        error
      );
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  console.error(
    "Could not initialize RabbitMQ consumer after multiple attempts. Exiting... ❌"
  );
  process.exit(1);
};
