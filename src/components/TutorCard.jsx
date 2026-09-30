import { Link } from 'react-router-dom';
import Stars from './Stars';

export default function TutorCard({ tutor }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: '0 0 4px' }}>
            <Link to={`/tutors/${tutor.id}`}>{tutor.name}</Link>
          </h3>
          <Stars rating={tutor.avg_rating} count={tutor.review_count} />
        </div>
        <div style={{ textAlign: 'right', fontWeight: 600 }}>
          {tutor.is_free ? (
            <span style={{ color: 'var(--success)' }}>Free</span>
          ) : tutor.hourly_rate ? (
            <span>{Number(tutor.hourly_rate).toLocaleString()} ETB/hr</span>
          ) : null}
        </div>
      </div>
      {tutor.bio && <p style={{ margin: '10px 0' }}>{tutor.bio}</p>}
      <div>
        {tutor.subjects?.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
