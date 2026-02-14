import { Logo, LogoHead } from '@/components/global/Logo';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { LayoutDashboard } from 'lucide-react';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent
})

function RootComponent() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-10">
          <div className="relative w-20 h-20  border border-white/10 rounded-2xl flex items-center justify-center ">
            <LogoHead size={80} />
          </div>
        </div>
        <h1 className="text-3xl font-black text-primary tracking-tight mb-3">
          TROO <span className="text-primary-gradient italic">Mobile</span>
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
          Coming Soon
        </p>
      </div>
    );
  }

  return <Outlet />;
}


