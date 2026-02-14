import { queryOptions } from "@tanstack/react-query";
import { getAllListingsApi, getListingByIdApi } from "../api/listingApi";

export const listingQueries = {
  list: () => queryOptions({
    queryKey: ['listings'],
    queryFn: getAllListingsApi,
    staleTime: 15 * 60 * 1000,
  }),

  ById: (id: string) => queryOptions({
    queryKey: ['listings-id', id],
    queryFn: () => getListingByIdApi(id),
    staleTime: 5 * 60 * 1000,
  }),
};