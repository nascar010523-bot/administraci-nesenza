import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { TESTS } from '../data/testRegistry.js';

export default function Dashboard({ onOpenAssessment, onNewAssessment }) {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'assessments'), orderBy('createdAt', 'desc'), limit(15));
      const snap = await getDocs(q);
      setRecent(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <p className="eyebrow">Panel</p>
      <h1 style={{ fontSize: 28, marginBottom: 6 }}>Evaluaciones recientes</h1>
      <p className="muted" style={{ marginBottom: 22 }}>Últimas evaluaciones registradas en tu práctica.</p>

      <button className="btn" onClick={onNewAssessment} style={{ marginBottom: 22 }}>
        + Nueva evaluación
      </button>

      <div className="card">
        {loading && <p className="muted">Cargando…</p>}
        {!loading && recent.length === 0 && <p className="muted">Todavía no hay evaluaciones registradas.</p>}
        {!loading && recent.length > 0 && (
          <table className="patient-table">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Test</th>
                <th>Nivel</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id} onClick={() => onOpenAssessment(a)}>
                  <td>{a.patientName}</td>
                  <td>{TESTS[a.testId]?.title || a.testId}</td>
                  <td>{a.overallPct}%</td>
                  <td>{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleDateString('es-HN') : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
