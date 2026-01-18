import { queryOptions } from "@tanstack/react-query";
import { getAllProjectsApi, getProjectByIdApi } from "../api/projectApi";

export const projectQueries = {
  list: () => queryOptions({
    queryKey: ['projects'],
    queryFn: getAllProjectsApi,
  }),

  ById: (id: string) => queryOptions({
    queryKey: ['projects-id', id],
    queryFn: () => getProjectByIdApi(id),
    staleTime: 5 * 60 * 1000,
  }),
};