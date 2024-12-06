import React from 'react';
import MetricsDashboard from './components/MetricsDashboard'; // Проверить правильность пути
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <MetricsDashboard />
    </ErrorBoundary>
  );
}

export default App;