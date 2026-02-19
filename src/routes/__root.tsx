import { LogoHead } from '@/components/global/Logo';
import { useIsMobileOrNestHub } from '@/hooks/useIsMobile';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
})

function RootComponent() {
  const { isMobile, isNestHub } = useIsMobileOrNestHub();

  if (isMobile || isNestHub) {
    return (
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-10">
          <div className="relative w-20 h-20 border border-white/10 rounded-2xl flex items-center justify-center">
            <LogoHead size="large" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-primary tracking-tight mb-3">
          TROO <span className="text-primary-gradient italic">Mobile</span>
        </h1>
        {isMobile ? (
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
            Coming Soon
          </p>
        ) : (
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
            Please use a desktop for the best experience
          </p>
        )}
      </div>
    );
  }

  return <Outlet />;
}