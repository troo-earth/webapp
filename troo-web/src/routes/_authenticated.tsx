import { authQueryOptions } from "@/features/auth/query/authQuery";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(authQueryOptions);
    if (!user) {
      throw redirect({
        to: '/login',
        search: (prev) => ({ ...prev, redirectTo: window.location.pathname }),
      });
    }

    return { user };
  },
});