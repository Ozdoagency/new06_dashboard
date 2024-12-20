import React from 'react';
import MetricsDashboard from './components/MetricsDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { TooltipProvider } from "@/components/ui/tooltip";
import '../i18n.js'; // Исправленный путь импорта

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <MetricsDashboard />
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;