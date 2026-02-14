import { queryOptions } from "@tanstack/react-query";
import { viewOrgInvitees } from "../api/inviteApi";

export const inviteQueries = {
  viewOrgInvitees: () => queryOptions({
    queryKey: ['view-invites'],
    queryFn: () => viewOrgInvitees(),
    staleTime: 30 * 60 * 1000,
  }),
};