import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './shared/Router';
import { Reset } from 'styled-reset';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
