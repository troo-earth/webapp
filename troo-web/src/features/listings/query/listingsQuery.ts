import { queryOptions } from "@tanstack/react-query";
import { getListingsApi } from "../api/getListingsApi";
import type { ListingsFilter } from "../types/listingTypes";

export const listingsQueryOptions = (orgId: string, filters?: ListingsFilter) =>
  queryOptions({
    queryKey: ['listings', orgId, filters],
    queryFn: () => getListingsApi(orgId, filters),
    enabled: !!orgId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });