import { queryOptions } from "@tanstack/react-query";
import { getInfoByOrgIdApi, getInfoByUserIdApi } from "../api/settingsApi";

export const settingsQueries = {
    viewOrgInfo : () => queryOptions({
        queryKey: ['view-org'],
        queryFn: () => getInfoByOrgIdApi(),
        staleTime: 30 * 60 * 1000,
        }),
        
    viewUserInfo : () => queryOptions({
        queryKey: ['view-user'],
        queryFn: () => getInfoByUserIdApi(),
        staleTime: 30 * 60 * 1000,
        }),
}