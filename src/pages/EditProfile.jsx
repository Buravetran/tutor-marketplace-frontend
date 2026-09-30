import { useEffect, useState } from 'react';
import api from '../api/client';

export default function EditProfile() {
  const [form, setForm] = useState({
    bio: '',
    subjects: '',
    hourly_rate: '',
    is_free: false,
    availability: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/tutors/me');
        setForm({
          bio: res.data.bio || '',
          subjects: (res.data.subjects || []).join(', '),
          hourly_rate: res.data.hourly_rate || '',
          is_free: res.data.is_free,
          availability: res.data.availability || '',
        });
      } catch (err) {
        // 404 just means no profile yet — that's fine, keep the blank form
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function update(field) {
    return (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm({ ...form, [field]: value });
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    const subjects = form.subjects
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      await api.put('/tutors/me', {
        bio: form.bio,
        subjects,
        hourly_rate: form.is_free ? null : form.hourly_rate || null,
        is_free: form.is_free,
        availability: form.availability,
      });
      setMessage('Profile saved. Learners can now find you by subject.');
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save your profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="page">Loading…</div>;

  return (
    <div className="page" style={{ maxWidth: 480 }}>
      <h1>My tutor profile</h1>
      {message && <p className="muted">{message}</p>}
      {error && <div className="error-banner">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Bio</label>
          <textarea rows={3} value={form.bio} onChange={update('bio')} />
        </div>
        <div className="field">
          <label>Subjects (comma-separated)</label>
          <input
            value={form.subjects}
            onChange={update('subjects')}
            placeholder="Python, Computer Science, English"
            required
          />
        </div>
        <div className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            id="is_free"
            checked={form.is_free}
            onChange={update('is_free')}
            style={{ width: 'auto' }}
          />
          <label htmlFor="is_free" style={{ margin: 0 }}>
            I tutor for free
          </label>
        </div>
        {!form.is_free && (
          <div className="field">
            <label>Hourly rate (ETB)</label>
            <input type="number" min="0" value={form.hourly_rate} onChange={update('hourly_rate')} />
          </div>
        )}
        <div className="field">
          <label>Availability</label>
          <input
            value={form.availability}
            onChange={update('availability')}
            placeholder="Weekday evenings"
          />
        </div>
        <button className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
