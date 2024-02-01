import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { DatesProvider } from '@mantine/dates';

import { AppRoutesProvider } from './core/routes';
import { AuthProvider } from './core/contexts';
import { theme } from './core/configs/mantine';

import 'dayjs/locale/pt-br';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <DatesProvider
            settings={{ locale: 'pt-br', timezone: 'America/Sao_Paulo' }}
          >
            <ModalsProvider>
              <AppRoutesProvider />
            </ModalsProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              closeOnClick
            />
          </DatesProvider>
        </MantineProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
