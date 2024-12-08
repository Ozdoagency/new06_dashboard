import React from 'react';
import MetricsDashboard from './components/MetricsDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { TooltipProvider } from "@/components/ui/tooltip";
import '/workspaces/new06_dashboard/i18n.js';

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