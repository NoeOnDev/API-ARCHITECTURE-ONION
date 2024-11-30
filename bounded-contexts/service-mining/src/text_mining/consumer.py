from detoxify import Detoxify
import re
from concurrent.futures import ThreadPoolExecutor
from _config.env import settings
import pika
import json

CACHE = {}
detoxify_model = Detoxify("multilingual")
toxic_labels = ['toxicity', 'severe_toxicity', 'obscene', 'threat', 'insult', 'identity_attack']

def preprocess_text(text):
    return re.split(r'([.?!,;])', text)

def analyze_word(word, model, threshold, toxic_labels):
    if word in CACHE:
        return CACHE[word]
    
    results = model.predict(word)
    is_toxic = any(results.get(label, 0) >= threshold for label in toxic_labels)
    CACHE[word] = "***" if is_toxic else word
    return CACHE[word]

def censor_text(text, threshold=0.5):
    fragments = preprocess_text(text)
    censored_fragments = []

    for fragment in fragments:
        if not fragment.strip() or fragment in ".?!,;":
            censored_fragments.append(fragment)
            continue

        results = detoxify_model.predict(fragment)
        
        if any(results.get(label, 0) >= threshold for label in toxic_labels):
            if len(fragment.split()) == 1:
                censored_fragments.append("***")
            else:
                words = fragment.split()
                with ThreadPoolExecutor() as executor:
                    censored_words = list(
                        executor.map(
                            lambda word: analyze_word(word, detoxify_model, threshold, toxic_labels), 
                            words
                        )
                    )
                censored_fragments.append(" ".join(censored_words))
        else:
            censored_fragments.append(fragment)

    return "".join(censored_fragments), results

def consume_messages():
    connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
    channel = connection.channel()
    channel.queue_declare(queue='text_mining_service', durable=True)

    def callback(ch, method, properties, body):
        message = json.loads(body)
        description = message.get("description", "")
        censored_description, results = censor_text(description)
        message["description"] = censored_description
        print(f"Received {json.dumps(message)}")
        print(f"Analysis Results: {results}")

    channel.basic_consume(queue='text_mining_service', 
                         on_message_callback=callback, 
                         auto_ack=True)

    print('Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()