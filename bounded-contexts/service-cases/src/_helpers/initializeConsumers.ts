import { createRabbitMQChannel } from "../_config/rabbitmq.config";
import { UpdateEntityDescriptionConsumer } from "../_shared/infrastructure/consumers/UpdateEntityDescriptionConsumer";

import { updateReportDescription } from "../reports/infrastructure/dependencyInjection";
import { updateAppointmentDescription } from "../appointments/infrastructure/dependencyInjection";
import { updateNewsDescription } from "../news/infrastructure/dependencyInjection";

export const initializeConsumers = async () => {
  const channel = await createRabbitMQChannel();

  const updateEntityDescriptionConsumer = new UpdateEntityDescriptionConsumer(
    channel,
    updateReportDescription,
    updateAppointmentDescription,
    updateNewsDescription
  );

  await updateEntityDescriptionConsumer.consume();
};
