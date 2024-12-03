import { Channel, ConsumeMessage } from "amqplib";
import { UpdateReportDescription } from "../../../reports/application/UpdateReportDescription";
import { UpdateAppointmentDescription } from "../../../appointments/application/UpdateAppointmentDescription";
import { UpdateNewsDescription } from "../../../news/application/UpdateNewsDescription";
import { DomainError } from "../../../_shared/domain/errors/DomainError";

export class UpdateEntityDescriptionConsumer {
  constructor(
    private readonly channel: Channel,
    private readonly updateReportDescription: UpdateReportDescription,
    private readonly updateAppointmentDescription: UpdateAppointmentDescription,
    private readonly updateNewsDescription: UpdateNewsDescription
  ) {}

  async consume(): Promise<void> {
    await this.channel.assertQueue("text_mining_processed", {
      durable: true,
    });

    this.channel.consume(
      "text_mining_processed",
      async (msg: ConsumeMessage | null) => {
        if (msg) {
          try {
            const { entityId, entityType, description } = JSON.parse(
              msg.content.toString()
            );

            switch (entityType) {
              case "Report":
                await this.updateReportDescription.execute(
                  entityId,
                  description
                );
                break;
              case "Appointment":
                await this.updateAppointmentDescription.execute(
                  entityId,
                  description
                );
                break;
              case "News":
                await this.updateNewsDescription.execute(entityId, description);
                break;
              default:
                throw new Error(`Unsupported entityType: ${entityType}`);
            }

            console.log(
              `Processed description update for entityId=${entityId}, entityType=${entityType}`
            );
            this.channel.ack(msg);
          } catch (error) {
            console.error("Error processing entity description update:", error);

            if (error instanceof DomainError) {
              console.error("Domain error:", error.message);
              this.channel.nack(msg, false, false);
            } else {
              console.error("Unexpected error:", error);
              this.channel.nack(msg, false, true);
            }
          }
        }
      },
      { noAck: false }
    );
  }
}
