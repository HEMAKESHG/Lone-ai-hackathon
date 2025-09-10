ClarityAI 📜✨
From Complexity to Clarity: An AI-powered legal assistant to demystify documents, identify risks, and connect you with help.

The Problem
Legal documents like rental agreements, contracts, and terms of service are filled with complex jargon, creating a power imbalance where people can unknowingly agree to unfavorable terms. This exposes them to significant financial and legal risks.

Our Solution
ClarityAI is a web application that bridges this gap. It uses the power of Google's Gemini 1.5 Pro to transform dense legal text into simple, actionable insights, empowering users to make informed decisions.

Key Features
Comprehensive Risk Analysis: Upload a PDF and instantly receive a color-coded risk score (Green, Yellow, Red) with a simple justification.

Interactive Clause Advisor: Dive into a detailed analysis of key clauses, with AI-powered advice on how to handle risky terms.

Intelligent Chatbot: Ask specific questions about your document in plain language and get conversational, context-aware answers and follow-up questions.

Advocate Finder: Seamlessly transition from understanding the problem to finding a solution with an integrated search for legal professionals, powered by the Google Places API.

Tech Stack
Frontend: React.js

Backend: Python (Flask)

Core AI: Google Gemini 1.5 Pro API

Data Sourcing: Google Places API

Document Processing: PyMuPDF

How to Run Locally
Backend Setup:

cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt # (You should create this file)
# Add your .env file with API keys
python app.py

Frontend Setup:

cd clarityai-mvp
npm install
npm start
the  project
