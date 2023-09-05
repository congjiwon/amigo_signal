import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Reset } from 'styled-reset';
import Router from './shared/Router';

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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
