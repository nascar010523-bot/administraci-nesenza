import { useEffect, useState } from 'react';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { TESTS } from '../data/testRegistry.js';

export default function Patients({ onOpenAssessment }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loadingAssessments, setLoadingAssessments] = useState(false);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'patients'), orderBy('name'));
      const snap = await getDocs(q);
      setPatients(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  async function openPatient(p) {
    setSelected(p);
    setLoadingAssessments(true);
    const q = query(
      collection(db, 'assessments'),
      where('patientId', '==', p.id),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    setAssessments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoadingAssessments(false);
  }

  const filtered = patients.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (selected) {
    return (
      <div>
        <button className="btn ghost sm" onClick={() => setSelected(null)} style={{ marginBottom: 18 }}>
          ← Todos los pacientes
        </button>
        <p className="eyebrow">Paciente</p>
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>{selected.name}</h1>
        <p className="muted" style={{ marginBottom: 20 }}>{selected.age && `${selected.age} años`}</p>

        <div className="card">
          <h3 style={{ fontSize: 17, marginBottom: 10 }}>Historial de evaluaciones</h3>
          {loadingAssessments && <p className="muted">Cargando…</p>}
          {!loadingAssessments && assessments.length === 0 && (
            <p className="muted">Este paciente todavía no tiene evaluaciones registradas.</p>
          )}
          {!loadingAssessments && assessments.length > 0 && (
            <table className="patient-table">
              <thead>
                <tr><th>Test</th><th>Nivel</th><th>Fecha</th></tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id} onClick={() => onOpenAssessment(a)}>
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

  return (
    <div>
      <p className="eyebrow">Pacientes</p>
      <h1 style={{ fontSize: 26, marginBottom: 18 }}>Todos tus pacientes</h1>
      <div className="field" style={{ maxWidth: 320 }}>
        <input placeholder="Buscar por nombre…" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="card">
        {filtered.length === 0 && <p className="muted">No se encontraron pacientes.</p>}
        {filtered.map((p) => (
          <div key={p.id} className="check-item" style={{ marginBottom: 6, cursor: 'pointer' }} onClick={() => openPatient(p)}>
            {p.name} {p.age && `· ${p.age} años`}
          </div>
        ))}
      </div>
    </div>
  );
}
