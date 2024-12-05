import { createRabbitMQChannel } from "../_config/rabbitmq.config";
import { UpdateEntityDescriptionConsumer } from "../_shared/infrastructure/consumers/UpdateEntityDescriptionConsumer";
import { updateReportDescription } from "../reports/infrastructure/dependencyInjection";
import { updateAppointmentDescription } from "../appointments/infrastructure/dependencyInjection";
import { updateNewsDescription } from "../news/infrastructure/dependencyInjection";

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

      await updateEntityDescriptionConsumer.consume();
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
