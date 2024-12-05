import { createRabbitMQChannel } from "../_config/rabbitmq.config";
import { UpdateEntityDescriptionConsumer } from "../_shared/infrastructure/consumers/UpdateEntityDescriptionConsumer";
import { ServiceNotificationConsumer } from "../notifications/infrastructure/consumers/ServiceNotificationConsumer";
import { updateReportDescription } from "../reports/infrastructure/dependencyInjection";
import { updateAppointmentDescription } from "../appointments/infrastructure/dependencyInjection";
import { updateNewsDescription } from "../news/infrastructure/dependencyInjection";
import { generateTokenForUser } from "../tokens/infrastructure/dependencyInjection";
import { sendNotification } from "../notifications/infrastructure/dependencyInjection";

export const initializeConsumers = async (retries: number, delay: number) => {
  for (let i = 0; i < retries; i++) {
    try {
      const channel = await createRabbitMQChannel();

      const updateEntityDescriptionConsumer =
        new UpdateEntityDescriptionConsumer(
          channel,
          updateReportDescription,
          updateAppointmentDescription,
          updateNewsDescription
        );

      const serviceNotificationConsumer = new ServiceNotificationConsumer(
        channel,
        generateTokenForUser,
        sendNotification
      );

      await updateEntityDescriptionConsumer.consume();
      await serviceNotificationConsumer.consume();
      console.log("RabbitMQ consumers initialized successfully ✅");
      return;
    } catch (error) {
      console.error(
        `Error initializing RabbitMQ consumers (attempt ${
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
    "Could not initialize RabbitMQ consumers after multiple attempts. Exiting... ❌"
  );
  process.exit(1);
};
