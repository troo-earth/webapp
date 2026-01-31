import { queryOptions } from "@tanstack/react-query";
import { getMyHoldingsApi } from "../api/myHoldingsApi";
import { getHoldingProjectApi } from "../api/myHoldingsApi";
import type { HoldingProject } from "../types/portfolioTypes";

export const portfolioQueries = {
  // Get all holdings for an organization
  myHoldings: (orgId: string) =>
    queryOptions({
      queryKey: ['my-holdings'],
      queryFn: () => getMyHoldingsApi(),
      enabled: !!orgId,
      staleTime: 5 * 60 * 1000,
    }),

  // Get project details by holding ID
  holdingProject: (holdingId: string) =>
    queryOptions<HoldingProject>({
      queryKey: ['holding-project', holdingId],
      queryFn: () => getHoldingProjectApi(holdingId),
      staleTime: 5 * 60 * 1000,
    }),
};