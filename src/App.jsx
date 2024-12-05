import React from 'react';
import { MantineProvider } from '@mantine/core';
import MetricsDashboard from '/workspaces/new06_dashboard/src/components/MetricsDashboard.jsx'; // Обновленный импорт
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