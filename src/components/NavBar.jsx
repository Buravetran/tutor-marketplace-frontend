import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--card)',
      }}
    >
      <div
        className="page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
        }}
      >
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, color: 'var(--ink)' }}>
          Tutor Marketplace
        </Link>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 15 }}>
          <Link to="/">Browse tutors</Link>
          {user && <Link to="/bookings">My bookings</Link>}
          {user?.role === 'tutor' && <Link to="/profile/edit">My profile</Link>}
          {user ? (
            <>
              <span className="muted">{user.name}</span>
              <button className="btn-outline btn" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
