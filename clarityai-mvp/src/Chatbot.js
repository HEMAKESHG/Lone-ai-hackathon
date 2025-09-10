import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ documentText, suggestedQuestions: initialSuggestedQuestions }) => {
  const [messages, setMessages] = useState([]);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([{ text: "Ask me any question about your document, or use one of the suggestions below!", sender: 'ai' }]);
    setCurrentSuggestions(initialSuggestedQuestions || []);
  }, [documentText, initialSuggestedQuestions]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { text, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
    setCurrentSuggestions([]); // Hide suggestions while waiting for a response

    try {
      const response = await axios.post('http://localhost:5000/ask-question', {
        document_text: documentText,
        user_question: text,
      });
      // The response is now an object with 'answer' and 'follow_up_questions'
      const { answer, follow_up_questions } = response.data;
      setMessages([...newMessages, { text: answer, sender: 'ai' }]);
      setCurrentSuggestions(follow_up_questions || []);
    } catch (error) {
      console.error("Error getting answer", error);
      const errorMessage = "Sorry, I encountered an error. Please try asking in a different way.";
      setMessages([...newMessages, { text: errorMessage, sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(userInput);
  };
  
  const handleSuggestionClick = (question) => {
    sendMessage(question);
  };

  return (
    <div style={{ border: '1px solid #555', borderRadius: '8px', padding: '15px', marginTop: '30px' }}>
      <h2>Ask Your Document 💬</h2>
      <div style={{ height: '300px', overflowY: 'auto', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#007bff' : '#444', padding: '8px 12px', borderRadius: '15px', maxWidth: '70%' }}>
            {msg.text}
          </div>
        ))}
      </div>
      
      {!isLoading && currentSuggestions.length > 0 && (
        <div style={{ marginBottom: '15px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {currentSuggestions.map((q, i) => (
                <button key={i} onClick={() => handleSuggestionClick(q)} disabled={isLoading} style={{fontSize: '0.8em', cursor: 'pointer'}}>
                    "{q}"
                </button>
            ))}
        </div>
      )}

      <form onSubmit={handleFormSubmit} style={{ display: 'flex' }}>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type your question..." style={{ flexGrow: 1, padding: '10px', marginRight: '10px' }} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Thinking...' : 'Send'}</button>
      </form>
    </div>
  );
};

export default Chatbot;
