import amqp, { Channel, Connection } from "amqplib";
import { env } from "./env.config";

export async function createRabbitMQConnection(): Promise<Connection> {
  return amqp.connect(env.rabbitmq.RABBIT_URL);
}

export async function createRabbitMQChannel(): Promise<Channel> {
  const connection = await createRabbitMQConnection();
  const channel = await connection.createChannel();
  return channel;
}
