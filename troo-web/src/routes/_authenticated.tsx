import { authQueries } from "@/features/auth/query/authQuery";
import { setAuth } from "@/features/auth/state/authSlice";
import store from "@/redux/store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(authQueries.me());
    if (!user) {
      throw redirect({
        to: '/login',
        search: (prev) => ({ ...prev, redirectTo: window.location.pathname }),
      });
    }

    store.dispatch(setAuth(user));
    return { user };
  },
});