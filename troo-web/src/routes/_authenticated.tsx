import { authQueryOptions } from "@/features/auth/query/authQuery";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    let user: Awaited<ReturnType<ReturnType<typeof authQueryOptions>["auth-user"]>> | null = null;

    try {
      // call the function to get options
      user = await context.queryClient.ensureQueryData(authQueryOptions);
    } catch (error: any) {
      // if /auth/me returns 401, React Query will throw here
      const status = error?.response?.status ?? error?.status ?? error?.cause?.status;

      if (status === 401) {
        user = null;
      } else {
        // rethrow for non-auth errors (500, network, etc.)
        throw error;
      }
    }

    if (!user) {
      throw redirect({
        to: '/login',
        search: (prev) => ({ ...prev, redirectTo: window.location.pathname }),
      });
    }

    return { user };
  },
});