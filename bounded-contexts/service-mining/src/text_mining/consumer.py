from _config.env import settings
import pika
import json
import time
from text_mining.model import censor_text

def consume_messages():
    max_retries = 10
    retry_delay = 10

    for attempt in range(max_retries):
        try:
            connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
            channel = connection.channel()
            channel.queue_declare(queue='text_mining_service', durable=True)
            break
        except pika.exceptions.AMQPConnectionError as e:
            print(f"Connection attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
            else:
                print("Max retries reached. Exiting.")
                return

    def process_message(ch, method, properties, body):
        try:
            message = json.loads(body)
            print(f"Received message: {message}")
            
            original_text = message.get('description', '')
            original_title = message.get('title', '')
            entity_id = message.get('entityId', '')
            entity_type = message.get('entityType', '')
            
            print(f"Original title: {original_title}")
            print(f"Original text: {original_text}")
            
            processed_title = censor_text(
                text=original_title,
                model_name="multilingual",
                threshold=0.7
            ) if original_title else ''
            
            processed_text = censor_text(
                text=original_text,
                model_name="multilingual",
                threshold=0.7
            ) if original_text else ''
            
            print(f"Processed title: {processed_title}")
            print(f"Processed text: {processed_text}")
            
            processed_message = {
                "entityId": entity_id,
                "entityType": entity_type,
                "title": processed_title,
                "description": processed_text
            }
            
            channel.queue_declare(queue='text_mining_processed', durable=True)
            channel.basic_publish(
                exchange='',
                routing_key='text_mining_processed',
                body=json.dumps(processed_message),
                properties=pika.BasicProperties(
                    delivery_mode=2,
                )
            )
            print(f"Processed message sent to queue: {processed_message}")
            
        except json.JSONDecodeError as e:
            print(f"Error decoding message: {e}")
            print(f"Received content: {body}")

    channel.basic_consume(
        queue='text_mining_service', 
        on_message_callback=process_message, 
        auto_ack=True
    )

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()