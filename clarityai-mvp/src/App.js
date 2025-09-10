import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Import all your components
import RiskScore from './RiskScore';
import KeyClauses from './KeyClauses';
import Chatbot from './Chatbot';
import AdvocateFinder from './AdvocateFinder';

function App() {
  // All state variables are declared here
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [documentText, setDocumentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  // This function is used by the file input
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // This function is used by the button
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysisResult(null);
    setShowDetails(false);

    const formData = new FormData();
    formData.append('file', selectedFile);

      // ...
      try {
          const response = await axios.post('http://localhost:5000/analyze-file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setAnalysisResult(response.data);
          // Use the new 'full_text' field from the backend for the best context!
          setDocumentText(response.data.full_text); 
      } catch (err) {
      // ...
      setError('File analysis failed. Please ensure it is a valid PDF.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ClarityAI 📜✨</h1>
        <p>Upload a legal document (PDF) for a full risk analysis.</p>

        {/* These elements use the handleFileChange and handleUpload functions */}
        <div style={{ marginBottom: '20px' }}>
          <input type="file" onChange={handleFileChange} accept=".pdf" />
          <button onClick={handleUpload} disabled={isLoading || !selectedFile}>
            {isLoading ? 'Analyzing...' : 'Analyze Document'}
          </button>
        </div>

        {/* This element uses the error state variable */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {analysisResult && (
          <div style={{ width: '80%', marginTop: '30px', textAlign: 'left' }}>
            <h2>Summary</h2>
            <p>{analysisResult.overall_summary}</p>
            
            <RiskScore scoreData={analysisResult.overall_risk_score} />
            
            <button onClick={() => setShowDetails(!showDetails)} style={{ marginBottom: '20px' }}>
              {showDetails ? 'Hide Detailed Analysis' : 'Show Detailed Analysis'}
            </button>

            {showDetails && (
              <KeyClauses clauses={analysisResult.key_clauses} />
            )}

            <Chatbot documentText={documentText} suggestedQuestions={analysisResult.suggested_questions} />
            <AdvocateFinder />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
