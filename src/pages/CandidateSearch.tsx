import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await searchGithub();
      const detailedCandidates = await Promise.all(
        results.items.map((user: any) => searchGithubUser(user.login))
      );
      setCandidates(detailedCandidates);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };
  const saveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem(
      'savedCandidates',
      JSON.stringify([...savedCandidates, candidate])
    );
  };

  return (
    <div className="search-page">
      <h1>Search GitHub Candidates</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search GitHub users..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <img src={candidate.avatar_url} alt={candidate.login} />
              <h3>{candidate.name || candidate.login}</h3>
              <p>{candidate.bio}</p>
              <button onClick={() => saveCandidate(candidate)}>Save Candidate</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;