import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { TEST_LIST } from '../data/testRegistry.js';

export default function NewAssessment({ onStartTest }) {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, 'patients'), orderBy('name'));
      const snap = await getDocs(q);
      setPatients(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreatePatient() {
    if (!newName.trim()) return;
    setCreating(true);
    const docRef = await addDoc(collection(db, 'patients'), {
      name: newName.trim(),
      nameLower: newName.trim().toLowerCase(),
      age: newAge.trim(),
      createdAt: serverTimestamp(),
    });
    const patient = { id: docRef.id, name: newName.trim(), age: newAge.trim() };
    setPatients((p) => [...p, patient]);
    setSelectedPatient(patient);
    setCreating(false);
    setNewName('');
    setNewAge('');
  }

  if (!selectedPatient) {
    return (
      <div>
        <p className="eyebrow">Nueva evaluación</p>
        <h1 style={{ fontSize: 26, marginBottom: 18 }}>Paso 1 · Selecciona o crea un paciente</h1>

        <div className="card">
          <div className="field">
            <label>Buscar paciente existente</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Escribe un nombre…" />
          </div>
          {search && filtered.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="check-item"
                  style={{ marginBottom: 6, cursor: 'pointer' }}
                  onClick={() => setSelectedPatient(p)}
                >
                  {p.name} {p.age && `· ${p.age} años`}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 17, marginBottom: 12 }}>O crea un paciente nuevo</h3>
          <div className="field">
            <label>Nombre completo</label>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div className="field">
            <label>Edad</label>
            <input value={newAge} onChange={(e) => setNewAge(e.target.value)} />
          </div>
          <button className="btn" onClick={handleCreatePatient} disabled={creating || !newName.trim()}>
            {creating ? 'Creando…' : 'Crear paciente y continuar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">Nueva evaluación para {selectedPatient.name}</p>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Paso 2 · Elige el test</h1>
      <button className="btn ghost sm" onClick={() => setSelectedPatient(null)} style={{ marginBottom: 18 }}>
        ← Cambiar paciente
      </button>

      <div className="test-grid">
        {TEST_LIST.map((t) => (
          <div key={t.id} className="test-tile" onClick={() => onStartTest(selectedPatient, t)}>
            <h3><span className="dot" style={{ background: t.color }} />{t.title}</h3>
            <p>{t.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
