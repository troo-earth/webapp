import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from "./routeTree.gen";
import { queryClient } from './lib/queryClient.ts';
import LoadingScreen from './components/global/Loading.tsx';
import { QueryClientProvider } from '@tanstack/react-query';

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPendingComponent: () => <LoadingScreen />,
    defaultPreload: 'viewport', 
});


declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;