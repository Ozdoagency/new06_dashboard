import React from 'react';
import MetricsDashboard from './components/MetricsDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import '/workspaces/new06_dashboard/i18n.js'; // Исправленный импорт

function App() {
  return (
    <ErrorBoundary>
      <MetricsDashboard />
    </ErrorBoundary>
  );
}

export default App;