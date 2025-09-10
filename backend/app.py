import os
import json
import requests
import fitz  # PyMuPDF
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# --- SETUP ---
# Load environment variables from your .env file
load_dotenv()

# Initialize the Flask application
app = Flask(__name__)
# Configure CORS to allow requests from your React frontend
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://10.219.229.43:3000"]}})

# --- API CONFIGURATION ---
# Configure Google AI (Gemini)
try:
    GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
    genai.configure(api_key=GEMINI_API_KEY)
    
    # A model instance configured to return structured JSON for analysis
    json_generation_config = genai.types.GenerationConfig(response_mime_type="application/json")
    analysis_model = genai.GenerativeModel('models/gemini-1.5-pro-latest', generation_config=json_generation_config)
    
    # A separate model instance for simple text responses (chat, suggestions)
    chat_model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
    
    print("Gemini 1.5 Pro models configured successfully.")
except Exception as e:
    print(f"!!! FATAL: Error configuring Gemini API: {e}")
    analysis_model = None
    chat_model = None

# --- CORE ROUTES ---

@app.route('/analyze-file', methods=['POST'])
def analyze_file_route():
    """ The main endpoint that receives a PDF, analyzes it for risks, and returns a structured JSON. """
    print("\n--- Request received for risk analysis ---")
    if not analysis_model:
        return jsonify({"error": "Analysis model not configured"}), 500
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = "".join(page.get_text() for page in doc)
        doc.close()

        if not text.strip():
            return jsonify({"error": "Could not extract text from PDF"}), 400

        prompt = f"""
        You are ClarityAI, an expert legal analyst. Analyze the following document from the perspective of the primary signee.
        Your goal is to identify risks and simplify complex terms.
        Return a single, valid JSON object with the following structure and nothing else:
        {{
          "overall_summary": "A brief, one-paragraph summary of the document's purpose.",
          "overall_risk_score": {{ "score": "Green | Yellow | Red", "justification": "A one-sentence explanation for the score." }},
          "key_clauses": [ {{ "clause_text": "...", "simplified_explanation": "...", "risk_level": "Green | Yellow | Red", "risk_justification": "..." }} ],
          "suggested_questions": [ "Generate 3-5 insightful questions a user should ask about this document." ]
        }}
        Document Text: --- {text} ---
        """
        
        print("Sending detailed analysis request to Gemini...")
        response = analysis_model.generate_content(prompt)
        print("Received structured JSON response from Gemini.")
        
        json_response = json.loads(response.text)
        json_response['full_text'] = text 
        return jsonify(json_response)

    except Exception as e:
        print(f"!!!!!! AN ERROR OCCURRED DURING ANALYSIS: {e} !!!!!!")
        return jsonify({"error": str(e)}), 500

@app.route('/suggest-change', methods=['POST'])
def suggest_change_route():
    """ Endpoint that provides AI advice for a specific risky clause. """
    print("\n--- Request received for a suggestion ---")
    if not chat_model:
        return jsonify({"error": "Chat model not configured"}), 500
    if not request.json or 'clause_text' not in request.json:
        return jsonify({"error": "Request must include clause_text"}), 400

    clause_text = request.json['clause_text']
    try:
        prompt = f"""
        A user has identified this clause as risky: "{clause_text}"
        Provide a single, actionable piece of advice. If it's a claim, suggest what evidence is needed. If it's a contractual term, suggest fairer wording. Keep it concise.
        """
        response = chat_model.generate_content(prompt)
        print("Generated a suggestion.")
        return jsonify({"suggestion": response.text})
    except Exception as e:
        print(f"!!!!!! AN ERROR OCCURRED DURING SUGGESTION: {e} !!!!!!")
        return jsonify({"error": str(e)}), 500

@app.route('/ask-question', methods=['POST'])
def ask_question_route():
    """ Endpoint for the intelligent chatbot that provides follow-up questions. """
    print("\n--- Request received for CONVERSATIONAL chatbot question ---")
    if not analysis_model:
        return jsonify({"error": "Analysis model not configured"}), 500
    if not request.json or 'document_text' not in request.json or 'user_question' not in request.json:
        return jsonify({"error": "Request missing document_text or user_question"}), 400

    document_text = request.json['document_text']
    user_question = request.json['user_question']
    try:
        prompt = f"""
        You are the "ClarityAI Assistant". Your purpose is to help users understand legal documents.
        Based ONLY on the provided "Document Text", answer the "User's Question". Then, generate 2-3 relevant follow-up questions the user might have.

        Follow these rules:
        1.  If asked for legal advice (e.g., "what should I do?"), you MUST refuse and strongly recommend consulting a qualified legal professional.
        2.  If the answer isn't in the text, say so helpfully.

        Return a single, valid JSON object with this exact structure:
        {{
            "answer": "Your direct answer to the user's question.",
            "follow_up_questions": [
                "A relevant follow-up question.",
                "Another relevant follow-up question."
            ]
        }}
        
        Document Text:
        ---
        {document_text}
        ---
        
        User's Question: "{user_question}"
        """
        response = analysis_model.generate_content(prompt)
        json_response = json.loads(response.text)
        print("Generated a CONVERSATIONAL chatbot answer.")
        return jsonify(json_response)
    except Exception as e:
        print(f"!!!!!! AN ERROR OCCURRED DURING CHATBOT RESPONSE: {e} !!!!!!")
        return jsonify({"error": str(e)}), 500
        
@app.route('/find-advocates', methods=['POST'])
def find_advocates_route():
    """ Endpoint that finds advocates using Google Places API and processes the data directly. """
    print("\n--- Request received to find advocates (with Website) ---")
    if not request.json or 'location' not in request.json:
        return jsonify({"error": "Request must include location"}), 400

    location = request.json.get('location', 'Chennai')
    case_type = request.json.get('case_type', 'divorce lawyer')
    search_query = f"{case_type} in {location}"
    
    try:
        # Step 1: Text Search to find a list of places
        places_url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={search_query}&key={GEMINI_API_KEY}"
        print(f"Searching Google Places for: {search_query}")
        places_response = requests.get(places_url)
        places_results = places_response.json().get('results', [])

        if not places_results:
            return jsonify({"error": "Could not find any relevant advocates via Google Places."}), 404
        
        # Step 2: Get Details for each Place and build our final list directly
        advocates_list = []
        for place in places_results[:5]: # Get details for top 5
            place_id = place.get('place_id')
            if not place_id:
                continue
            
            # THE MODIFIED LINE IS HERE: Added 'website' to the fields list
            details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_address,rating,user_ratings_total,formatted_phone_number,website&key={GEMINI_API_KEY}"
            
            details_response = requests.get(details_url)
            result = details_response.json().get('result', {})
            
            if result:
                # THE SECOND MODIFIED LINE IS HERE: Added the 'website' key
                advocates_list.append({
                    "name": result.get('name', 'Name not available'),
                    "address": result.get('formatted_address', 'Address not available'),
                    "phone_number": result.get('formatted_phone_number', 'Not available'),
                    "website": result.get('website', None), # Added website field
                    "rating": result.get('rating', 'No rating'),
                    "total_ratings": result.get('user_ratings_total', 0)
                })

        print("Generated detailed advocate list (with websites) directly from Google Places.")
        return jsonify({"advocates": advocates_list})

    except Exception as e:
        print(f"!!!!!! AN ERROR OCCURRED FINDING ADVOCATES: {e} !!!!!!")
        return jsonify({"error": str(e)}), 500





# --- START THE SERVER ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)

