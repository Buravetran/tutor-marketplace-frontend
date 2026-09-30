import { useState } from 'react';
import api from '../api/client';

export default function ReviewForm({ bookingId, onDone }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.post('/reviews', { booking_id: bookingId, rating, comment });
      setMessage('Thanks for your review!');
      setOpen(false);
      onDone?.();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Could not submit review.');
    } finally {
      setSaving(false);
    }
  }

  if (message && !open) return <p className="muted">{message}</p>;

  if (!open) {
    return (
      <button className="btn btn-outline" onClick={() => setOpen(true)}>
        Leave a review
      </button>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 10 }}>
      {message && <p className="muted">{message}</p>}
      <div className="field">
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n === 1 ? '' : 's'}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label>Comment (optional)</label>
        <textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button className="btn btn-primary" disabled={saving}>
        {saving ? 'Submitting…' : 'Submit review'}
      </button>
    </form>
  );
}
