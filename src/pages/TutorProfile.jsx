import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import Stars from '../components/Stars';

export default function TutorProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tutor, setTutor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [subject, setSubject] = useState('');
  const [when, setWhen] = useState('');
  const [booking, setBooking] = useState(false);
  const [bookingMsg, setBookingMsg] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [tutorRes, reviewsRes] = await Promise.all([
          api.get(`/tutors/${id}`),
          api.get(`/tutors/${id}/reviews`),
        ]);
        setTutor(tutorRes.data);
        setReviews(reviewsRes.data);
        setSubject(tutorRes.data.subjects?.[0] || '');
      } catch (err) {
        setError('Could not load this tutor.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleBook(e) {
    e.preventDefault();
    setBookingMsg('');
    setBooking(true);
    try {
      await api.post('/bookings', {
        tutor_id: Number(id),
        subject,
        requested_time: new Date(when).toISOString(),
      });
      setBookingMsg('Request sent! Check "My bookings" to track it.');
    } catch (err) {
      setBookingMsg(err.response?.data?.error || 'Could not send the request.');
    } finally {
      setBooking(false);
    }
  }

  if (loading) return <div className="page">Loading…</div>;
  if (error) return <div className="page error-banner">{error}</div>;
  if (!tutor) return null;

  return (
    <div className="page">
      <h1 style={{ marginBottom: 4 }}>{tutor.name}</h1>
      <Stars rating={tutor.avg_rating} count={tutor.review_count} />

      <div style={{ margin: '16px 0' }}>
        {tutor.subjects?.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>

      {tutor.bio && <p>{tutor.bio}</p>}
      <p className="muted">
        {tutor.is_free ? 'Free' : tutor.hourly_rate ? `${tutor.hourly_rate} ETB/hr` : ''}
        {tutor.availability ? ` · ${tutor.availability}` : ''}
      </p>

      {user?.role === 'learner' && (
        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginTop: 0 }}>Request a session</h3>
          {bookingMsg && <p className="muted">{bookingMsg}</p>}
          <form onSubmit={handleBook}>
            <div className="field">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {tutor.subjects?.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Preferred time</label>
              <input
                type="datetime-local"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary" disabled={booking}>
              {booking ? 'Sending…' : 'Request session'}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <p className="muted" style={{ marginTop: 24 }}>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>
            Log in to request a session
          </button>
        </p>
      )}

      <h3 style={{ marginTop: 32 }}>Reviews</h3>
      {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
      {reviews.map((r) => (
        <div className="card" key={r.id}>
          <strong>{r.learner_name}</strong> — <span className="rating">{'★'.repeat(r.rating)}</span>
          {r.comment && <p style={{ margin: '6px 0 0' }}>{r.comment}</p>}
        </div>
      ))}
    </div>
  );
}
