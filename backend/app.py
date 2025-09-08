import os
import json
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import fitz  # PyMuPDF

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://10.219.229.43:3000"]}})

# --- Gemini Configuration ---
try:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    # This configuration tells the model to expect a JSON response
    generation_config = genai.types.GenerationConfig(response_mime_type="application/json")
    model = genai.GenerativeModel('models/gemini-1.5-pro-latest', generation_config=generation_config)
    print("Gemini 1.5 Pro (JSON mode) configured successfully.")
except Exception as e:
    print(f"!!! FATAL: Error configuring Gemini API: {e}")
    model = None

@app.route('/analyze-file', methods=['POST'])
def analyze_file_route():
    print("\n--- Request received for risk analysis ---")
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

        # --- THE NEW, POWERFUL PROMPT ---
        prompt = f"""
        You are ClarityAI, an expert legal analyst. Analyze the following document from the perspective of the primary signee.
        Your goal is to identify risks and simplify complex terms.
        
        Return a single, valid JSON object with the following structure and nothing else:
        {{
          "overall_summary": "A brief, one-paragraph summary of the document's purpose.",
          "overall_risk_score": {{
            "score": "Green | Yellow | Red",
            "justification": "A one-sentence explanation for the overall risk score."
          }},
          "key_clauses": [
            {{
              "clause_text": "The original text of the clause.",
              "simplified_explanation": "A simple, one or two-sentence explanation of what this clause means.",
              "risk_level": "Green | Yellow | Red",
              "risk_justification": "A brief explanation of why this clause is rated Green, Yellow, or Red."
            }}
          ],
          "suggested_questions": [
            "Generate 3-5 insightful questions a user should ask about this document based on your analysis."
          ]
        }}

        Document Text:
        ---
        {text}
        ---
        """
        
        print("Sending detailed analysis request to Gemini...")
        response = model.generate_content(prompt)
        print("Received structured JSON response from Gemini.")
        
        # The response.text will be a JSON string, so we parse it into a Python dict
        # and then Flask will re-serialize it as a proper JSON response.
        json_response = json.loads(response.text)
        return jsonify(json_response)

    except Exception as e:
        print(f"!!!!!! AN ERROR OCCURRED DURING ANALYSIS: {e} !!!!!!")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)