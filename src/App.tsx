import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
import { Reset } from 'styled-reset';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
