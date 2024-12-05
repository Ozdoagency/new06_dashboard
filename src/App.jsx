import React from 'react';
import { MantineProvider } from '@mantine/core';
import MetricsDashboard from './components/MetricsDashboard'; // Обновленный импорт
import ErrorBoundary from '/workspaces/new06_dashboard/src/components/ErrorBoundary.jsx';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ErrorBoundary>
        <div className="App">
          <MetricsDashboard />
        </div>
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default App;