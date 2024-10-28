import * as amqp from "amqplib";
import { EventPublisher } from "../domain/EventPublisher";

export class RabbitMQEventPublisher implements EventPublisher {
  private channel!: amqp.Channel;

  constructor() {
    this.connect();
  }

  private async connect() {
    const connection = await amqp.connect("amqp://user:password@127.0.0.1");
    this.channel = await connection.createChannel();
    await this.channel.assertExchange("user_events", "topic", {
      durable: true,
    });
  }

  async publish(eventType: string, payload: any): Promise<void> {
    this.channel.publish(
      "user_events",
      eventType,
      Buffer.from(JSON.stringify(payload))
    );
  }
}
