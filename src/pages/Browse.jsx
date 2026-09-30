import { useEffect, useState } from 'react';
import api from '../api/client';
import TutorCard from '../components/TutorCard';

export default function Browse() {
  const [subject, setSubject] = useState('');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadTutors(query) {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tutors', { params: query ? { subject: query } : {} });
      setTutors(res.data);
    } catch (err) {
      setError('Could not load tutors. Try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTutors('');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    loadTutors(subject);
  }

  return (
    <div className="page">
      <h1>Find a tutor</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        <input
          placeholder="Search by subject, e.g. Python, English…"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 12px',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: 15,
          }}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {error && <div className="error-banner">{error}</div>}
      {loading && <p className="muted">Loading tutors…</p>}
      {!loading && tutors.length === 0 && (
        <p className="muted">No tutors found. Try a different subject.</p>
      )}
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
