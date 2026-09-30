export default function Stars({ rating, count }) {
  if (!rating) return <span className="muted">No reviews yet</span>;

  const full = Math.round(rating);
  return (
    <span>
      <span className="rating">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>{' '}
      <span className="muted">
        {rating} ({count} review{count === 1 ? '' : 's'})
      </span>
    </span>
  );
}
