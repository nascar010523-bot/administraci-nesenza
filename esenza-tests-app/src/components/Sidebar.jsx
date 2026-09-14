import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Sidebar({ view, setView }) {
  const items = [
    { key: 'dashboard', label: 'Panel' },
    { key: 'newAssessment', label: 'Nueva evaluación' },
    { key: 'patients', label: 'Pacientes' },
  ];
  return (
    <div className="sidebar">
      <div className="brand">
        <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
          <path d="M20 4c6 5 10 11 10 18a10 10 0 0 1-20 0c0-7 4-13 10-18z" fill="#2D6B4A" opacity="0.9" />
          <path d="M20 12c3.2 3 5 6.4 5 10a5 5 0 0 1-10 0c0-3.6 1.8-7 5-10z" fill="#C9A84C" />
        </svg>
        <span className="name">Esenza</span>
      </div>
      {items.map((i) => (
        <button
          key={i.key}
          className={`nav-btn ${view === i.key ? 'active' : ''}`}
          onClick={() => setView(i.key)}
        >
          {i.label}
        </button>
      ))}
      <div className="spacer" />
      <button className="nav-btn logout" onClick={() => signOut(auth)}>
        Cerrar sesión
      </button>
    </div>
  );
}
