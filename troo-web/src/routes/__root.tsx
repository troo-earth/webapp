import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense } from 'react';
import type { useAuth } from '../hooks/auth/useAuth';
import LoadingScreen from '@/components/global/Loading';

interface MyRouterContext {
  queryClient: QueryClient
  auth: ReturnType<typeof useAuth>
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Suspense fallback={<LoadingScreen/>}>
        <Outlet />
      </Suspense>

      {/* <TanStackRouterDevtools /> */}
    </>
  );
}