import { queryOptions } from "@tanstack/react-query";
import { getMyHoldingsApi } from "../api/getMyHoldingsApi";

export const portfolioQueryOptions = (orgId: string) =>
  queryOptions({
    queryKey: ['my-holdings', orgId],
    queryFn: () => getMyHoldingsApi(orgId),
    enabled: !!orgId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });