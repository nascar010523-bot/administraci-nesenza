import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { computeDomainScores, computeOverallPct, totalItemCount } from '../engine/scoring.js';

export default function TestRunner({ patient, test, onComplete, onCancel }) {
  const [stage, setStage] = useState('intro'); // intro | questions
  const [duration, setDuration] = useState('');
  const [factors, setFactors] = useState([]);
  const [note, setNote] = useState('');
  const [answers, setAnswers] = useState({});
  const [secondaryAnswers, setSecondaryAnswers] = useState({});
  const [saving, setSaving] = useState(false);
  const [hint, setHint] = useState('');

  const total = totalItemCount(test);
  const answered = Object.keys(answers).length + Object.keys(secondaryAnswers).length;

  function toggleFactor(f) {
    setFactors((cur) => (cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]));
  }

  function answerDomain(domainCode, qi, val) {
    setAnswers((a) => ({ ...a, [`${domainCode}-${qi}`]: val }));
  }
  function answerSecondary(code, val) {
    setSecondaryAnswers((a) => ({ ...a, [code]: val }));
  }

  async function handleSubmit() {
    if (answered < total) {
      setHint(`Aún faltan ${total - answered} preguntas por responder.`);
      return;
    }
    setSaving(true);
    const domainScores = computeDomainScores(test, answers);
    const overallPct = computeOverallPct(domainScores);

    const docData = {
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age || '',
      testId: test.id,
      testTitle: test.title,
      answers,
      secondaryAnswers,
      meta: { duration, factors, note },
      domainScores,
      overallPct,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'assessments'), docData);
    setSaving(false);
    onComplete({ id: docRef.id, ...docData, createdAt: new Date() });
  }

  if (stage === 'intro') {
    return (
      <div>
        <p className="eyebrow">{test.title}</p>
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>Contexto para {patient.name}</h1>
        <p className="muted" style={{ marginBottom: 18 }}>{test.subtitle}</p>

        <div className="card">
          {test.durationQuestion && (
            <div className="field">
              <label>{test.durationQuestion}</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="">Prefiere no responder</option>
                <option>Menos de 1 mes</option>
                <option>1 a 6 meses</option>
                <option>6 meses a 1 año</option>
                <option>1 a 3 años</option>
                <option>Más de 3 años</option>
                <option>No está segura/o</option>
              </select>
            </div>
          )}
          {test.factorsChecklist && (
            <div className="field">
              <label>¿Qué siente que está influyendo? (marca lo que aplique)</label>
              <div className="check-grid">
                {test.factorsChecklist.map((f) => (
                  <label key={f} className="check-item">
                    <input type="checkbox" checked={factors.includes(f)} onChange={() => toggleFactor(f)} />
                    {f}
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="field">
            <label>Notas (opcional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contexto que quieras dejar anotado para la sesión."
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn ghost" onClick={onCancel}>Cancelar</button>
            <button className="btn" onClick={() => setStage('questions')}>Comenzar cuestionario →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow">{test.title} · {patient.name}</p>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.round((answered / total) * 100)}%` }} />
      </div>
      <p className="muted" style={{ marginBottom: 18 }}>{answered} de {total} respondidas</p>

      {test.domains.map((domain) => (
        <div key={domain.code} style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 20, marginBottom: 2 }}>{domain.name}</h2>
          <p className="muted" style={{ marginBottom: 12 }}>{domain.blurb}</p>
          {domain.items.map((item, qi) => {
            const key = `${domain.code}-${qi}`;
            const val = answers[key];
            return (
              <div key={key} className={`question ${val === undefined ? 'unanswered' : ''}`}>
                <div className="qtext">{item.text}</div>
                <div className="toggle">
                  {test.levels.map((lv) => (
                    <button
                      key={lv.val}
                      className={val === lv.val ? 'active' : ''}
                      onClick={() => answerDomain(domain.code, qi, lv.val)}
                    >
                      {lv.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {test.secondary && (
        <div style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: 20, marginBottom: 2 }}>{test.secondary.title}</h2>
          <p className="muted" style={{ marginBottom: 12 }}>{test.secondary.subtitle}</p>
          {test.secondary.options.map((opt) => {
            const val = secondaryAnswers[opt.code];
            return (
              <div key={opt.code} className={`question ${val === undefined ? 'unanswered' : ''}`}>
                <div className="qtext">{opt.label}</div>
                <div className="toggle">
                  {test.secondary.levels.map((lv) => (
                    <button
                      key={lv.val}
                      className={val === lv.val ? 'active' : ''}
                      onClick={() => answerSecondary(opt.code, lv.val)}
                    >
                      {lv.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {hint && <p className="error-text">{hint}</p>}
      <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
        <button className="btn ghost" onClick={onCancel}>Cancelar</button>
        <button className="btn" onClick={handleSubmit} disabled={saving}>
          {saving ? 'Guardando…' : 'Ver perfil de resultados'}
        </button>
      </div>
    </div>
  );
}
