from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import openai

app = Flask(__name__)
CORS(app)

# Ottieni la chiave API di OpenAI dalle variabili d'ambiente
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("API key non trovata nelle variabili d'ambiente!")
else:
    print(f"API key letta: {api_key}")  # Aggiungi questa riga per verificare

openai.api_key = api_key

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    
    if not user_message:
        return jsonify({"errore": "Messaggio non fornito"}), 400
    
    try:
        # Esegui la chiamata API a OpenAI per ottenere una risposta dal modello GPT
        response = openai.Completion.create(
            model="gpt-3.5-turbo",  # Usa il modello GPT-3
            prompt=f"Cliente: {user_message}\nOperatore: ",
            max_tokens=100,  # Imposta un limite ai token
            temperature=0.7,  # Imposta la creatività della risposta
        )
        print("Risposta OpenAI:", response)  # Aggiungi questa linea per vedere la risposta
        
        # Estrai la risposta dal modello
        ai_message = response.choices[0].text.strip()
        
        return jsonify({"message": ai_message})
    
    except Exception as e:
        print(f"Errore: {str(e)}")  # Aggiungi il log dell'errore
        return jsonify({"errore": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
