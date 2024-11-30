from detoxify import Detoxify
import re
from concurrent.futures import ThreadPoolExecutor

CACHE = {}

def preprocess_text(text):
    return re.split(r'([.?!,;])', text)

def analyze_word(word, model, threshold, toxic_labels):
    if word in CACHE:
        return CACHE[word]

    results = model.predict(word)
    print(f"Resultados para '{word}':", results)
    is_toxic = any(results.get(label, 0) >= threshold for label in toxic_labels)

    CACHE[word] = "***" if is_toxic else word
    return CACHE[word]

def censor_text(text, model_name="multilingual", threshold=0.5):
    detoxify_model = Detoxify(model_name)
    toxic_labels = ['toxicity', 'severe_toxicity', 'obscene', 'threat', 'insult', 'identity_attack']

    fragments = preprocess_text(text)
    censored_fragments = []

    for fragment in fragments:
        if not fragment.strip() or fragment in ".?!,;":
            censored_fragments.append(fragment)
            continue

        results = detoxify_model.predict(fragment)
        print(f"Resultados para '{fragment}':", results)

        if any(results.get(label, 0) >= threshold for label in toxic_labels):
            if len(fragment.split()) == 1:
                censored_fragments.append("***")
            else:
                words = fragment.split()
                with ThreadPoolExecutor() as executor:
                    censored_words = list(
                        executor.map(lambda word: analyze_word(word, detoxify_model, threshold, toxic_labels), words)
                    )
                censored_fragments.append(" ".join(censored_words))
        else:
            censored_fragments.append(fragment)

    return "".join(censored_fragments)

input_text = (
    "El contenedor de basura esta sucio, debería limpiarlo."
)
censored_text = censor_text(input_text, model_name="multilingual", threshold=0.7)
print("Texto censurado:", censored_text)
