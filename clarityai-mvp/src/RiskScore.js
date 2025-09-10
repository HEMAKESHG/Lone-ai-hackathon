import React from 'react';

const RiskScore = ({ scoreData }) => {
  if (!scoreData) return null;

  const { score, justification } = scoreData;

  const getScoreColor = () => {
    switch (score?.toLowerCase()) {
      case 'green':
        return '#28a745'; // Green
      case 'yellow':
        return '#ffc107'; // Yellow
      case 'red':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Grey
    }
  };

  const scoreStyle = {
    backgroundColor: getScoreColor(),
    color: score?.toLowerCase() === 'yellow' ? '#000' : '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
  };

  return (
    <div style={scoreStyle}>
      <h2>Overall Risk: {score}</h2>
      <p>{justification}</p>
    </div>
  );
};

export default RiskScore;