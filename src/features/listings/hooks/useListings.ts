import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { listingsQueryOptions } from "../query/listingsQuery";
import type { ListingsFilter } from "../types/listingTypes";

export const useListings = (filters?: ListingsFilter) => {
  const { user } = useAuth();
  const orgId = user?.org_id;

  return useQuery({
    ...listingsQueryOptions(orgId!, filters),
    enabled: !!orgId,
  });
};