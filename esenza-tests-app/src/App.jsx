import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import NewAssessment from './components/NewAssessment.jsx';
import Patients from './components/Patients.jsx';
import TestRunner from './components/TestRunner.jsx';
import ResultProfile from './components/ResultProfile.jsx';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = cargando, null = sin sesión
  const [view, setView] = useState('dashboard');
  const [runnerCtx, setRunnerCtx] = useState(null); // { patient, test }
  const [resultAssessment, setResultAssessment] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) return null;
  if (user === null) return <Login />;

  function goDashboard() {
    setRunnerCtx(null);
    setResultAssessment(null);
    setView('dashboard');
  }

  function handleStartTest(patient, test) {
    setRunnerCtx({ patient, test });
    setView('runner');
  }

  function handleTestComplete(assessment) {
    setResultAssessment(assessment);
    setRunnerCtx(null);
    setView('result');
  }

  function handleOpenAssessment(assessment) {
    setResultAssessment(assessment);
    setView('result');
  }

  return (
    <div className="app-shell">
      <Sidebar view={view === 'runner' || view === 'result' ? '' : view} setView={setView} />
      <div className="main">
        {view === 'dashboard' && (
          <Dashboard onOpenAssessment={handleOpenAssessment} onNewAssessment={() => setView('newAssessment')} />
        )}
        {view === 'newAssessment' && <NewAssessment onStartTest={handleStartTest} />}
        {view === 'patients' && <Patients onOpenAssessment={handleOpenAssessment} />}
        {view === 'runner' && runnerCtx && (
          <TestRunner
            patient={runnerCtx.patient}
            test={runnerCtx.test}
            onComplete={handleTestComplete}
            onCancel={goDashboard}
          />
        )}
        {view === 'result' && resultAssessment && (
          <ResultProfile assessment={resultAssessment} onBack={goDashboard} />
        )}
      </div>
    </div>
  );
}
