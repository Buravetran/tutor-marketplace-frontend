import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import ReviewForm from '../components/ReviewForm';

const STATUS_LABEL = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
  completed: 'Completed',
};

const STATUS_COLOR = {
  pending: 'var(--accent)',
  accepted: 'var(--primary)',
  declined: 'var(--danger)',
  completed: 'var(--success)',
};

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/bookings/mine');
      setBookings(res.data);
    } catch (err) {
      setError('Could not load your bookings.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id, status) {
    setActionError('');
    try {
      await api.patch(`/bookings/${id}`, { status });
      load();
    } catch (err) {
      setActionError(err.response?.data?.error || 'Could not update this booking.');
    }
  }

  if (loading) return <div className="page">Loading…</div>;
  if (error) return <div className="page error-banner">{error}</div>;

  return (
    <div className="page">
      <h1>My bookings</h1>
      {actionError && <div className="error-banner">{actionError}</div>}
      {bookings.length === 0 && <p className="muted">No bookings yet.</p>}

      {bookings.map((b) => {
        const isTutor = b.tutor_id === user.id;
        const otherName = isTutor ? b.learner_name : b.tutor_name;
        const when = new Date(b.requested_time).toLocaleString();

        return (
          <div className="card" key={b.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{b.subject}</strong> with {otherName}
                <div className="muted">{when}</div>
              </div>
              <span style={{ color: STATUS_COLOR[b.status], fontWeight: 600 }}>
                {STATUS_LABEL[b.status]}
              </span>
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              {isTutor && b.status === 'pending' && (
                <>
                  <button className="btn btn-primary" onClick={() => updateStatus(b.id, 'accepted')}>
                    Accept
                  </button>
                  <button className="btn btn-danger" onClick={() => updateStatus(b.id, 'declined')}>
                    Decline
                  </button>
                </>
              )}
              {b.status === 'accepted' && (
                <button className="btn btn-outline" onClick={() => updateStatus(b.id, 'completed')}>
                  Mark completed
                </button>
              )}
            </div>

            {!isTutor && b.status === 'completed' && (
              <div style={{ marginTop: 12 }}>
                <ReviewForm bookingId={b.id} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
