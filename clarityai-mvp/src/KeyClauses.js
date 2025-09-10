import React, { useState } from 'react';
import axios from 'axios';

const KeyClauses = ({ clauses }) => {
  const [suggestions, setSuggestions] = useState({});
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(null); // Track loading by index

  if (!clauses || clauses.length === 0) return null;

  const handleSuggestAlternative = async (clause, index) => {
    setIsLoadingSuggestion(index);
    try {
      const response = await axios.post('http://localhost:5000/suggest-change', {
        clause_text: clause.clause_text,
      });
      setSuggestions(prev => ({ ...prev, [index]: response.data.suggestion }));
    } catch (error) {
      console.error("Failed to get suggestion", error);
      setSuggestions(prev => ({ ...prev, [index]: "Could not get a suggestion at this time." }));
    } finally {
      setIsLoadingSuggestion(null);
    }
  };

  const getRiskColor = (level) => {
    // ... (getRiskColor function remains the same)
    switch (level?.toLowerCase()) {
      case 'green': return '#28a745';
      case 'yellow': return '#ffc107';
      case 'red': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const clauseCardStyle = {
    backgroundColor: '#333',
    borderLeft: '5px solid',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
  };

  const suggestionStyle = {
    backgroundColor: '#444',
    padding: '10px',
    marginTop: '15px',
    borderRadius: '5px',
    border: '1px dashed #666'
  };

  return (
    <div style={{ width: '100%' }}>
      <h2>Key Clauses Analysis</h2>
      {clauses.map((clause, index) => (
        <div key={index} style={{ ...clauseCardStyle, borderLeftColor: getRiskColor(clause.risk_level) }}>
          <h4>Clause Risk: {clause.risk_level}</h4>
          <p><strong>Simplified Explanation:</strong> {clause.simplified_explanation}</p>
          <p><em>Justification: {clause.risk_justification}</em></p>
          
          {clause.risk_level?.toLowerCase() !== 'green' && !suggestions[index] && (
             <button 
                onClick={() => handleSuggestAlternative(clause, index)} 
                disabled={isLoadingSuggestion === index}
                style={{marginTop: '10px'}}
             >
                {isLoadingSuggestion === index ? 'Getting advice...' : 'Get AI Advice'}
             </button>
          )}

          {suggestions[index] && (
            <div style={suggestionStyle}>
              <p><strong>💡 AI Advice:</strong></p>
              <p>{suggestions[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default KeyClauses;