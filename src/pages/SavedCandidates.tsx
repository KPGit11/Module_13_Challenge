import { useState, useEffect } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const removeCandidate = (id: number) => {
    const updated = savedCandidates.filter(candidate => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
    setSavedCandidates(updated);
  };

  return (
    <div className="saved-candidates">
      <h1>Saved Candidates</h1>
      <div className="candidates-grid">
        {savedCandidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.login} />
            <h3>{candidate.name || candidate.login}</h3>
            <p>{candidate.bio}</p>
            <p>Followers: {candidate.followers}</p>
            <p>Following: {candidate.following}</p>
            <p>Public Repos: {candidate.public_repos}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
            <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
