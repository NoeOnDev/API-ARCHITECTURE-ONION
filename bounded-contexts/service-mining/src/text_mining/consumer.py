from _config.env import settings
import pika
import json

def consume_messages():
    connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
    channel = connection.channel()
    channel.queue_declare(queue='text_mining_service', durable=True)

    def callback(ch, method, properties, body):
        message = json.loads(body)
        print(f"Message received: {json.dumps(message)}")

    channel.basic_consume(queue='text_mining_service', 
                         on_message_callback=callback, 
                         auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()