import amqp from "amqplib";
import { env } from "./env.config";

export async function createChannel() {
  const connection = await amqp.connect(env.rabbitmq.RABBIT_URL);
  const channel = await connection.createChannel();
  return channel;
}
