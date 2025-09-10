import React, { useState } from 'react';
import axios from 'axios';

const AdvocateFinder = () => {
  const [location, setLocation] = useState('Chennai');
  const [advocates, setAdvocates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false); // To track if a search has been made

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setAdvocates([]);
    setSearched(true); // Mark that a search was attempted
    try {
      const response = await axios.post('http://localhost:5000/find-advocates', {
        location: location,
        case_type: 'divorce lawyers' // Plural often gives better search results
      });
      // Safely access the advocates array, default to an empty array if not found
      const advocatesList = response.data?.advocates || [];
      setAdvocates(advocatesList);
      if (advocatesList.length === 0) {
          setError("No advocates found in your area via Google Maps for this search.");
      }
    } catch (err) {
      setError('Could not fetch advocate information. Please check the server and API keys.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #555', borderRadius: '8px', padding: '15px', marginTop: '30px' }}>
      <h2>Find a Legal Professional 🧑‍⚖️</h2>
      <p>Need help? Find professionals in your area using Google Maps data. This is a search tool, not a referral service.</p>
      <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your city"
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {searched && !isLoading && advocates.length > 0 && (
        <div>
          {advocates.map((adv, index) => (
            <div key={index} style={{ backgroundColor: '#444', padding: '15px', borderRadius: '5px', marginBottom: '10px' }}>
              <h4>{adv.name || 'Name not available'}</h4>
              <p><strong>📍 Address:</strong> {adv.address || 'Not specified'}</p>
              <p><strong>📞 Phone:</strong> {adv.phone_number || 'Not available'}</p>
              
              {/* This block conditionally renders a clickable website link */}
              {adv.website && (
                <p>
                  <strong>🌐 Website:</strong>{' '}
                  <a href={adv.website} target="_blank" rel="noopener noreferrer" style={{ color: '#87CEEB', textDecoration: 'underline' }}>
                    Visit Site
                  </a>
                </p>
              )}

              <p><strong>⭐ Rating:</strong> {adv.rating ? `${adv.rating} / 5 (${adv.total_ratings} ratings)` : 'No rating available'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvocateFinder;

