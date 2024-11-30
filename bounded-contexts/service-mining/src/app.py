from flask import Flask
from _config.env import settings
from text_mining.consumer import consume_messages
import threading

app = Flask(__name__)

if __name__ == '__main__':
    port = settings.PORT
    consumer_thread = threading.Thread(target=consume_messages)
    consumer_thread.start()
    app.run(debug=True, port=port)