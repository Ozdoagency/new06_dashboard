import React from 'react';
import MetricsDashboard from './components/MetricsDashboard'; // Обновленный импорт
import ErrorBoundary from './components/ErrorBoundary'; // Обновленный импорт

function App() {
  return (
    <ErrorBoundary>
      <MetricsDashboard />
    </ErrorBoundary>
  );
}

export default App;